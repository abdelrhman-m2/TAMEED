import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import contactRouter from "./routes/contact.js";
import demoRouter from "./routes/demo.js";
import quoteRouter from "./routes/quote.js";
import statsRouter from "./routes/stats.js";
import aiRouter from "./routes/ai.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json({ limit: "200kb" }));
const corsOrigins = process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:8080", "http://localhost:5173"];
app.use(cors({ origin: corsOrigins }));
app.use(morgan("tiny"));

const limiter = rateLimit({ windowMs: 60_000, max: 30 });
app.use("/contact", limiter);
app.use("/demo", limiter);
app.use("/quote", limiter);

app.get("/health", (_req, res) => res.json({ ok: true, service: "taamed-api" }));
app.use("/contact", contactRouter);
app.use("/demo", demoRouter);
app.use("/quote", quoteRouter);
app.use("/stats", statsRouter);
app.use("/ai", aiRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal error" });
});

app.listen(PORT, () => console.log(`TAAMED API running on :${PORT}`));
