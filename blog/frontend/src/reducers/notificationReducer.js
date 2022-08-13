import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  error: false,
  content: "",
};

let timeout;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    resetMessage(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (content, error, time = 5) => {
  return (dispatch) => {
    clearTimeout(timeout);
    dispatch(setMessage({ content, error }));
    timeout = setTimeout(() => {
      dispatch(resetMessage());
    }, time * 1000);
  };
};

const { setMessage, resetMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
