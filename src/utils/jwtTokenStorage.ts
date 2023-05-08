export const tokens = {
  setAccessToken: (accessToken: string) => {
    localStorage.setItem("x-access", accessToken);
  },
  removeAccessToken: () => {
    localStorage.removeItem("x-access");
  },
  accessToken: () => localStorage.getItem("x-access"),
};
