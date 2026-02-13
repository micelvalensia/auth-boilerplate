import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import errorHandlers from "../middlewares/error.js";
import router from "./route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

// Api Endpoint
app.use(router);

// Error
app.use(errorHandlers);

export default app;
