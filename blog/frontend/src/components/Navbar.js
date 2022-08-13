import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { Logout } from "../reducers/authReducer";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutPressed = () => {
    dispatch(Logout());
    dispatch(setNotification("Logout Successful", false));
    navigate("/");
  };

  const loginOrLogout = user ? (
    <>
      <span
        className="cursor-pointer"
        onClick={() => {
          logoutPressed();
        }}
      >
        Logout
      </span>
      <a className="ml-4">Welcome {user.name}</a>
    </>
  ) : (
    <Link to={"/login"}>Login</Link>
  );

  return (
    <nav className="bg-zinc-800 text-white  h-16 flex justify-center shadow-md select-none">
      <div className="container lg:mx-80 flex justify-between items-center">
        <Link to={"/"}>
          <h3 className="text-3xl">FSO Blogs</h3>
        </Link>
        <ul className="list-none">
          <li className="space-x-8">
            <Link to={"/blogs"}>Blogs</Link>
            {user ? <Link to={"/blogs/new"}>Create</Link> : <></>}
            <Link to={"/users"}>Users</Link>
            {loginOrLogout}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
