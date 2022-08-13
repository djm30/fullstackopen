import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import authReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    user: authReducer,
    users: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
