export const tokens = {
  setAccessToken: (accessToken: string) => {
    localStorage.setItem("x-access", accessToken);
    window.dispatchEvent(new Event("storage"));
  },
  removeAccessToken: () => {
    localStorage.removeItem("x-access");
    window.dispatchEvent(new Event("storage"));
  },
  accessToken: () => localStorage.getItem("x-access"),
};
