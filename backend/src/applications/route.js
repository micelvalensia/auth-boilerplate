import express from "express";
import authRoutes from "../features/auth/auth-route.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use(authenticateToken);

export default router;
