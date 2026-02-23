import {
  getMe,
  loginService,
  refreshTokenService,
  registerService,
} from "./auth-service.js";
import { verifiedEmail } from "./email-verification/email-verification-service.js";

export const getMeController = async (req, res, next) => {
  const result = await getMe();

  res.send(result);
};

export const registerController = async (req, res, next) => {
  try {
    const result = await registerService(req.body);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const verifiedEmailController = async (req, res, next) => {
  try {
    const { token } = req.query;
    await verifiedEmail(token);

    res.status(200).json({ success: true, message: "OK" });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };
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

export const refreshTokenController = async (req, res, next) => {
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
