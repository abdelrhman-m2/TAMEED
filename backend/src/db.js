import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

export const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : undefined
);

export const query = (text, params) => pool.query(text, params);
