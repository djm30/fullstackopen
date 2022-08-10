import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    resetMessage(state, action) {
      return "";
    },
  },
});

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(resetMessage());
    }, duration * 1000);
  };
};

export const { setMessage, resetMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
