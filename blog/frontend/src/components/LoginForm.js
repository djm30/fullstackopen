import React, { useEffect, useState } from "react";
import { tryLoginFromLocal, Login } from "../reducers/authReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";
import Input from "./Common/Input";

const LoginForm = () => {
  const [resetUsername, usernameInput] = useField("text");
  const [resetPassword, passwordInput] = useField("text");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(tryLoginFromLocal());
  }, [dispatch]);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(Login(usernameInput.value, passwordInput.value));
      resetUsername();
      resetPassword();
      dispatch(setNotification("Login Successful!", false));
      navigate("/");
    } catch (e) {
      console.log(e);
      dispatch(setNotification("Login Failed!", true));
    }
  };

  return (
    <form className="text-white flex justify-center" onSubmit={onFormSubmit}>
      <div className="text-white flex flex-col items-center mt-20">
        <Input {...usernameInput} name="username">
          Username
        </Input>
        <Input {...passwordInput} name="password">
          Password
        </Input>
        <button
          id="login-submit"
          className="bg-emerald-500 hover:bg-emerald-300 transition-all mt-2 px-4 py-2 rounded-md"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
