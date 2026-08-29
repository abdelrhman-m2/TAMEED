import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import contactRouter from "../backend/src/routes/contact.js";
import demoRouter from "../backend/src/routes/demo.js";
import quoteRouter from "../backend/src/routes/quote.js";
import statsRouter from "../backend/src/routes/stats.js";
import aiRouter from "../backend/src/routes/ai.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "200kb" }));

const corsOrigins =
  process.env.CORS_ORIGIN?.split(",").map((x) => x.trim()) ?? ["*"];

app.use(cors({ origin: corsOrigins }));
app.use(morgan("tiny"));

const limiter = rateLimit({
  windowMs: 60_000,
  max: 30,
});

app.use("/contact", limiter);
app.use("/demo", limiter);
app.use("/quote", limiter);
app.use("/ai", limiter);

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "taamed-api",
  });
});

app.use("/contact", contactRouter);
app.use("/demo", demoRouter);
app.use("/quote", quoteRouter);
app.use("/stats", statsRouter);
app.use("/ai", aiRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal error",
  });
});

export default app;
