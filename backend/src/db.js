import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in environment");
}

/**
 * Supabase admin client (uses secret key — server-side only).
 * Used by routes via supabase.from('table').insert/select/etc.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
  realtime: { transport: ws },
  db: { schema: "public" },
});
