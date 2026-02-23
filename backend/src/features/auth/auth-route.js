import express from "express";
import {
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  verifiedEmailController,
} from "./auth-controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth-validation.js";

const router = express.Router();

router.get("/", getMeController);

if (process.env.NODE_ENV === "development") {
  router.post("/register", validate(registerSchema), registerController);
}
router.post("/login", validate(loginSchema), loginController);
router.post("/refresh-token", refreshTokenController);
router.post("/verify-email", verifiedEmailController);
router.post("/logout", logoutController);

export default router;
