import { prisma } from "../../config/db.js";

export const getMe = async () => {
  const users = await prisma.user.findMany();

  return users;
};
