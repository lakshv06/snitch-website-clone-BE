import express from "express";
import pool from "../database.js";
import authenticateToken from "../middleware/authenticateToken.js";

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
    client.release();

    if (result.rows.length > 0) {
      // Add your logic to verify the OTP and Password here.
      // For example, you might check if the OTP matches a value stored in the database.
      // And you would compare the password using bcrypt or a similar library.

      // Assuming OTP and Password are verified
      res.status(200).send({ message: "Login successful!" });
    } else {
      res
        .status(404)
        .send({
          error:
            "No account with this email exists. Please try signing up instead.",
        });
    }
  } catch (err) {
    console.error("Error during login", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
