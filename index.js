import createError from "http-errors";
import cors from "cors";
import compression from "compression";
import express from "express";
import { PORT } from "./config/index.js";
import Router from './routes/index.js';

const app = express();

const corsConfig = {
  origin:
    process.env.NODE_ENV === "production" ? ["https://transcript-chain.vercel.app/"] : ["http://localhost:3000","https://transcript-chain.vercel.app"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to TranscriptChain",
  });
});

app.use("/", Router);

//Catch 404 and forard to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: "ERROR",
    message: err.message,
    payload: { ...err },
  });
});

app.listen(PORT, () =>
  console.log(`Transcript chain server is live on port http://0.0.0.0.:${PORT}`)
);
