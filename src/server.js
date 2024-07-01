import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import createUserRoute from './routes/createUser.js';
import getLoginSessionRoute from './routes/getLoginSessionRoute.js'
import getSignInRoute from './routes/getSignInRoute.js'
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
    console.log("GET method for / route called");
  });

  app.use('/sign-up', createUserRoute);

  app.use('/get-login-session', getLoginSessionRoute);

  app.use('/sign-in', getSignInRoute);

  return app;
}

export default startServer;
