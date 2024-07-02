import express from "express";
import pool from "../database.js";
import bcrypt from "bcrypt";
import authenticateToken from "../middleware/authenticateToken.js";
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
    const client = await pool.connect();
    const queryText = "SELECT * FROM users WHERE email = $1";
    const queryValues = [email];

    const result = await client.query(queryText, queryValues);

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

    client.release();
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
