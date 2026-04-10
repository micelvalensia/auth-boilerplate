import jwtUtils from "../utils/jwt.js";
import ApiError from "./api-error.js";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: { userId: number; username: string; email: string };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Token tidak ditemukan");
    }

    const token = authHeader.split(" ")[1]!;

    const decoded = jwtUtils.verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
