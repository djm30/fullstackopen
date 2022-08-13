import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setState(state, action) {
      return action.payload;
    },
  },
});

export const intitializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setState(users));
  };
};

const { setState } = usersSlice.actions;
export default usersSlice.reducer;
