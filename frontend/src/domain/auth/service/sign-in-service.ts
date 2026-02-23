import api from "@/lib/api/axios";
import { LoginSchema } from "../schema/sign-in.schema";

export const loginService = async (data: LoginSchema) => {
  try {
    const response = await api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshService = async () => {
  try {
    const response = await api.post("/auth/refresh-token");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMeService = async () => {
  try {
    const response = await api.get("/auth");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};
