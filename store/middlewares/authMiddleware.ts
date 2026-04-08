import { TOKEN_NAME, USER_INFO_NAME, USER_NOTIFS } from "src/constants";

export const authMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === "auth/loginSuccess") {
    const { token, user , notif } = action.payload;
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(USER_INFO_NAME, JSON.stringify(user));
    localStorage.setItem(USER_NOTIFS,JSON.stringify(notif));
  }
  return next(action);
};
