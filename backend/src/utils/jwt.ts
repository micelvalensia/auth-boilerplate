import jwt from "jsonwebtoken";

type JwtUserPayload = {
  userId: number;
  username: string;
  email: string;
};

const generateAccessToken = (payload: JwtUserPayload): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_ACCESS_SECRET is not defined in environment variables",
    );
  }
  return jwt.sign({ payload }, secret, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (payload: number): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables",
    );
  }
  return jwt.sign({ payload }, secret, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token: string): JwtUserPayload => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_ACCESS_SECRET is not defined in environment variables",
    );
  }
  const decoded = jwt.verify(token, secret) as any;
  return decoded.payload as JwtUserPayload;
};

const verifyRefreshToken = (token: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables",
    );
  }
  return jwt.verify(token, secret);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
