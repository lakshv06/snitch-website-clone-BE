# lakshv06 Personal Learning Project

This is lakshv06 personal learning project showcasing various Node.js and Postgres concepts. This is a fullstack project with the Frontend side also available on GitHub.

## Project Description

A comprehensive fullstack application demonstrating user authentication, session management, and OTP-based login system using React.js for the frontend and Express.js for the backend.

## Technologies Used

- React.js
- Express.js
- PostgreSQL
- SendGrid for email services

## Setting Up the Frontend

1. **Clone the Repository**

   git clone https://github.com/your-username/backend-repo.git
   cd frontend-repo

2. create a .env file in root directory of frontend folder and add following commands in that-
    `{PORT=YOUR_BACKEND_PORT}`
    `{PGUSER=YOUR_POSTGRES_USER}`
    `{PGHOST=YOUR_POSTGRES_HOST}`
    `{PGDATABASE=YOUR_PG_DB_NAME}`
    `{PGPASSWORD=YOUR_PG_DB_PASSWORD}`
    `{PGPORT=YOUR_PG_PORT}`
    `{JWT_SECRET=YOUR_LONG_JWT_SECRET_KEY}`
    `{JWT_EXPIRES_IN= INT_VALUE_IN_HOURS}`
    `{SENDGRID_API_KEY= YOUR_SENDGRID_API_KEY}`
    `{EMAIL_ID_TO_SEND_OTP ="YOUR_EMAIL_ID_TO_SEND_OTP"}`
    `{REDIS_HOST=YOUR_REDIS_SERVER_HOST_NAME}`
    `{REDIS_PORT=YOUR_REDIS_SERVER_PORT}`

3. Run npm install in terminal to download all the required node packages.

4. Run nodemon index.js in your terminal -> server should be up and running with the message - "Your Server is up and runnning on {YOUR_BE_PORT}."
