import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setUser(state, action) {
      loginService.setLocalStorage(action.payload);
      blogService.setToken(action.payload);
      return action.payload;
    },
    logout(state, action) {
      loginService.logoutOfLocalStorage();
      return null;
    },
  },
});

export const tryLoginFromLocal = () => {
  return (dispatch) => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      dispatch(setUser(user));
    }
  };
};

export const Login = (username, password) => {
  return async (dispatch) => {
    console.log("loggin in...");
    console.log(username, " ", password);
    const user = await loginService.login(username, password);
    dispatch(setUser(user));
  };
};

export const Logout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};

const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
