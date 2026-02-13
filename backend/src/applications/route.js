import express from "express";
import authRoutes from "../features/auth/auth-route.js";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;
