import express from "express";
import pool from "../db/database.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received POST request to /sign-up");

  console.log("Request Body:", req.body);

  const { name, email, password, confirm_password } = req.body;

  if (!name) {
    return res.status(400).send({ error: "Name cannot be empty" });
  }

  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  if (password !== confirm_password) {
    return res
      .status(400)
      .send({ error: "Password and confirm password should be the same" });
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).send({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();

    const queryText =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
    const queryValues = [name, email, hashedPassword];

    const result = await client.query(queryText, queryValues);

    client.release();

    if (result.rows.length > 0) {
      console.log("User inserted successfully:", result.rows[0]);
      res.status(201).send({ id: result.rows[0].id, name, email });
    } else {
      console.error("User insertion failed");
      res.status(500).send({ error: "User insertion failed" });
    }
  } catch (err) {
    console.error("Error inserting user", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
