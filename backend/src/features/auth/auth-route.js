import express from "express";
import { getMeController } from "./auth-controller.js";

const router = express.Router();

router.get("/", getMeController);

export default router;
