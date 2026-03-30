import { TOKEN_NAME, USER_INFO_NAME } from "src/constants";

export const authMiddleware = (store: any) => (next: any) => (action: any) => {
    if (action.type === "auth/loginSuccess") {
        const { token, user } = action.payload;
        localStorage.setItem(TOKEN_NAME, token);
        localStorage.setItem(USER_INFO_NAME, JSON.stringify(user));
    }
    return next(action);
}