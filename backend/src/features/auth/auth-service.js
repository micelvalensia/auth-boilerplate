import { prisma } from "../../config/db.js";
import ApiError from "../../middlewares/api-error.js";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "../../utils/generate-random-token.js";
import { emailVerificationSender } from "./email-verification/email-verification-service.js";

export const getMe = async () => {
  const users = await prisma.user.findMany();

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
