let accessToken: string | null = null;

export const authTokenStore = {
  getToken: () => accessToken,
  setToken: (token: string | null) => {
    accessToken = token;
  },
  clearToken: () => {
    accessToken = null;
  },
};
