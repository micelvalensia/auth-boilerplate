import jwtUtils from "../utils/jwt.js";
import ApiError from "./api-error.js";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Token tidak ditemukan");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwtUtils.verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
