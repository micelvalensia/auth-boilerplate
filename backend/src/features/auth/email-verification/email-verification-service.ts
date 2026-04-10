import { prisma } from "../../../config/db.js";
import ApiError from "../../../middlewares/api-error.js";
import { sendEmail } from "../../../utils/email-sender.js";
import { emailVerifTemplateHTML } from "./template.js";
import crypto from "crypto";

export const emailVerificationSender = async (
  user: { username: string; email: string },
  verificationToken: string,
) => {
  const { username, email } = user;

  const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;

  const htmlTemplate = emailVerifTemplateHTML(
    username,
    verificationLink,
    email,
  );

  await sendEmail({
    to: email,
    subject: "Verify Your Email - Auth Boil",
    text: "",
    html: htmlTemplate,
  });
};

export const verifiedEmail = async (verificationToken: string) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const tokenRecord = await prisma.emailVerificationToken.findUnique({
    where: { token: hashedToken },
    include: { user: true },
  });

  if (!tokenRecord) {
    throw new ApiError(400, "Invalid token");
  }

  if (tokenRecord.usedAt) {
    throw new ApiError(400, "Token already used");
  }

  if (tokenRecord.expiredAt < new Date()) {
    throw new ApiError(400, "Token expired");
  }

  if (tokenRecord.user.email_verified_at) {
    throw new ApiError(400, "Email already verified");
  }

  await prisma.user.update({
    where: { id: tokenRecord.userId },
    data: {
      email_verified_at: new Date(),
    },
  });

  await prisma.emailVerificationToken.update({
    where: { id: tokenRecord.id },
    data: {
      usedAt: new Date(),
    },
  });
};
