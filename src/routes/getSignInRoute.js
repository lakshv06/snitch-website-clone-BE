import express from "express";
import pool from "../db/database.js";
import bcrypt from "bcrypt";
import authenticateToken from "../middleware/authenticateToken.js";
import redisClient from "../redis/redis-server.js";
import { verifyOtp } from "../otp-engine/otpengine.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    return res
      .status(400)
      .send({ error: "Email, OTP, and Password are required!" });
  }

  try {
    const dbClient = await pool.connect();
    const queryText = "SELECT * FROM users WHERE email = $1";
    const queryValues = [email];

    const result = await dbClient.query(queryText, queryValues);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const hashedPassword = user.password;

      // Verify OTP
      const otpValid = verifyOtp(email, otp);

      if (!otpValid) {
        return res.status(401).send({ error: "Invalid OTP" });
      }

      // Verify Password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const userData = {
          otp: user.otp,
          email: user.email,
          // Add other relevant user data you may want to cache
        };

        // Set user data in Redis with an expiration time (e.g., 1 hour)
        redisClient.setEx(`user:${user.id}`, 3600, JSON.stringify(userData));

        res.status(200).send({ message: "Login successful!" });
      } else {
        res.status(401).send({ error: "Invalid password" });
      }
    } else {
      res.status(404).send({
        error:
          "No account with this email exists. Please try signing up instead.",
      });
    }

    dbClient.release();
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
