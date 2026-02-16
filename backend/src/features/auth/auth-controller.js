import { getMe, registerService } from "./auth-service.js";
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
