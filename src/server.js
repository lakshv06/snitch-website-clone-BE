import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import createUserRoute from './routes/createUser.js'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

function startServer() {
  const app = express();
  // Middleware to parse JSON bodies
  app.use(bodyParser.json());

  // Middleware to parse URL-encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Middleware to enable CORS
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Get method for / route called");
  });

  app.use('/sign-up', createUserRoute);

  return app;
}

export default startServer;
