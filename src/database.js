import pkg from 'pg';
import dotenv from 'dotenv';

// Destructure the Pool from the imported package
const { Pool } = pkg;

// Load environment variables from .env file
dotenv.config();

// Configure PostgreSQL connection pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL
    );
`;

const initDb = async () => {
    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        client.release();
        console.log('Table "users" created successfully');
    } catch (err) {
        console.error('Error creating table', err);
    }
};

initDb();

export default pool;
