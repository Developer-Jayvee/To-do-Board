import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "services/modules/authApi";
import { TOKEN_NAME, USER_INFO_NAME } from "src/constants";
import type { RootState } from "store";

interface AuthState {
  isAuthenticated: boolean;
  userToken: string | null;
  userInfo: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userToken: null,
  userInfo: null,
};

export const logoutUser = createAsyncThunk(
  "auth/logoutUser" ,async () => {
    const response = await authApi.logout();
    return response;
})
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
        const user =  localStorage.getItem(USER_INFO_NAME) ?? null ;
        if(token && user){
          state.isAuthenticated = token ? true : false      
          state.userToken = token;
          state.userInfo = JSON.parse(user);
        }
      }
    }
  },
  extraReducers(builder){
    builder
    .addCase(logoutUser.fulfilled,(state,action) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.userInfo = null;
    })
  }
});

export const isUserAuthenticated = (state : RootState) => state.auth.isAuthenticated;
export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
