import { prisma } from "../../config/db.js";
import ApiError from "../../middlewares/api-error.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "../../utils/generate-random-token.js";
import { emailVerificationSender } from "./email-verification/email-verification-service.js";
import jwtUtils from "../../utils/jwt.js";

export const getMe = async (userId = 1) => {
  const users = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      username: true,
      email: true,
      description: true,
      created_at: true,
      password_changed_at: true,
      password_expired_at: true,
    },
  });

  return users;
};

export const registerService = async (body) => {
  const { username, password, description, email } = body;

  const isEmailUserExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
        { email },
      ],
    },
  });

  if (isEmailUserExist) {
    throw new ApiError(400, "Username or Emails has already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      description,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  const { hashedToken, rawToken } = generateVerificationToken();

  await prisma.emailVerificationToken.create({
    data: {
      userId: createdUser.id,
      token: hashedToken,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  setImmediate(() => {
    emailVerificationSender(createdUser, rawToken).catch((err) => {
      console.error("Email sending failed:", err);
    });
  });

  return createdUser;
};

export const loginService = async (body) => {
  const { email, password } = body;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid email or password");
  }

  const payload = {
    username: isUserExist.username,
    email: isUserExist.email,
    userId: isUserExist.id,
  };

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const accessToken = jwtUtils.generateAccessToken(payload);
  const refreshToken = jwtUtils.generateRefreshToken(isUserExist.id);

  // TODO: create refresh token ke db
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expires_at: expiresAt,
      user_id: isUserExist.id,
    },
  });

  return { accessToken, refreshToken };
};

export const refreshTokenService = async (refreshToken) => {
  const decode = jwtUtils.verifyRefreshToken(refreshToken);

  if (!decode) {
    throw new ApiError(400, "Refresh token tidak valid");
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
    include: {
      user: true,
    },
  });

  if (!storedToken) {
    throw new ApiError(400, "Refresh token tidak valid");
  }

  if (new Date() > storedToken.expires_at) {
    await prisma.refreshToken.delete({
      where: { id: storedToken.id },
    });
    throw new ApiError(401, "Refresh token sudah expired");
  }

  const payload = {
    username: storedToken.user.username,
    email: storedToken.user.email,
    userId: storedToken.user.id,
  };

  const newAccessToken = jwtUtils.generateAccessToken(payload);

  return { token: newAccessToken };
};
