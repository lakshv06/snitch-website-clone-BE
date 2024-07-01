import express from "express";
import pool from "../database.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email required!" });
  }

  try {
    const client = await pool.connect();
    const queryText = 'SELECT id FROM users WHERE email = $1';
    const queryValues = [email];

    const result = await client.query(queryText, queryValues);
    client.release();

    if (result.rows.length > 0) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.status(200).send({ token_response: token, email: email });
    } else {
      res.status(404).send({ error: "No account with this email exists. Please try signing up instead." });
    }
  } catch (err) {
    console.error('Error checking email', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default router;
