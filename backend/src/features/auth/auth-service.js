import { prisma } from "../../config/db.js";
import ApiError from "../../middlewares/api-error.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "../../utils/generate-random-token.js";
import { emailVerificationSender } from "./email-verification/email-verification-service.js";
import jwtUtils from "../../utils/jwt.js";

export const getMe = async (userId) => {
  const users = await prisma.user.findFirst({
    where: {
      id: userId
    }
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
      email: email
    }
  })

  if (!isUserExist) {
    throw new ApiError(400, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid email or password')
  }

  const payload = {
    username: isUserExist.username,
    email: isUserExist.email,
    userId: isUserExist.id
  }

  const accessToken = jwtUtils.generateAccessToken(payload)
  const refreshToken = jwtUtils.generateRefreshToken(isUserExist.id)

  // TODO: create refresh token ke db

  return { accessToken, refreshToken }
}