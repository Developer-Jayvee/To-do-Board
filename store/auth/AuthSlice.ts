import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME, USER_INFO_NAME } from "src/constants";
import type { RootState } from "store";

interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
  userInfo: {
    username: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userToken: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
      state.userInfo = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userInfo = null;
    },
    checkIfAuthenticated: (state) => {
      if(typeof window !== "undefined"){
        const token =  localStorage.getItem(TOKEN_NAME) ?? null;
        state.isAuthenticated = token ? true : false      
      }
    }
  },
});

export const isUserAuthenticated = (state : RootState) => state.auth.isAuthenticated;
export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
