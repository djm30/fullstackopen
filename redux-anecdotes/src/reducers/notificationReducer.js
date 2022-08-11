import { createSlice } from "@reduxjs/toolkit";

let timerId;

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
    console.log(timerId);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      dispatch(resetMessage());
    }, duration * 1000);
  };
};

export const { setMessage, resetMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
