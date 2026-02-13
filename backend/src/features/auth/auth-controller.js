import { getMe } from "./auth-service.js";

export const getMeController = async (req, res, next) => {
  const result = await getMe();

  res.send(result);
};
