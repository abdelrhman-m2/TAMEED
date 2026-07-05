import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { pool } from "../db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(resolve(__dirname, "../../../database/seed.sql"), "utf8");

const run = async () => {
  console.log("Seeding database...");
  await pool.query(sql);
  console.log("Done.");
  await pool.end();
};

run().catch((e) => { console.error(e); process.exit(1); });
