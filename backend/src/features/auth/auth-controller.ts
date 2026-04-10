import ApiError from "../../middlewares/api-error.js";
import { AuthRequest } from "../../middlewares/auth.js";
import {
  getMe,
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from "./auth-service.js";
import { verifiedEmail } from "./email-verification/email-verification-service.js";
import { Request, Response, NextFunction } from "express";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const getMeController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const result = await getMe(req.user?.userId!);

  res.status(200).json({ data: result });
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerService(req.body);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const verifiedEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.query;
    await verifiedEmail(token as string);

    res.status(200).json({ success: true, message: "OK" });
  } catch (error) {
    next(error);
  } finally {
    res.redirect("http://localhost:3000/sign-in");
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = await loginService(req.body);

    res.cookie("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: { token: accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw new ApiError(401, "Refresh token tidak ditemukan");
    }

    const { token } = await refreshTokenService(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token berhasil diperbarui",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    await logoutService(refreshToken);

    res.clearCookie("refresh_token", cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logout berhasil",
    });
  } catch (error) {
    next(error);
  }
};
