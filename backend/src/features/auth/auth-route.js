import express from "express";
import {
  getMeController,
  loginController,
  registerController,
  verifiedEmailController,
} from "./auth-controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth-validation.js";
import { authenticateToken } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getMeController);

if (process.env.NODE_ENV === "development") {
  router.post("/register", validate(registerSchema), registerController);
}
router.post("/login", validate(loginSchema), loginController)
router.post("/verify-email", verifiedEmailController);

export default router;
