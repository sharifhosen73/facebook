import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserCircle, FaFacebookMessenger } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Log Out Successfully");
      })
      .catch();
  };

  const menuItem = [
    <>
      <li className="mx-14 text-3xl">
        <Link to="/" className="p-0">
          <FaHome />
        </Link>
      </li>
      <li className="mx-14 text-3xl">
        <Link to="/about" className="p-0">
          <FaUserCircle />
        </Link>
      </li>
      <li className="mx-14 text-3xl">
        <Link to="/messenger" className="p-0">
          <FaFacebookMessenger />
        </Link>
      </li>
    </>,
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="navbar-center flex lg:hidden">
          <ul className="menu menu-horizontal justify-between">{menuItem}</ul>
        </div>
        <Link className="text-3xl font-bold text-primary hidden lg:flex">
          Facebook
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal justify-between">{menuItem}</ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        {user?.email ? (
          <button onClick={handleLogOut} className="btn btn-sm">
            Log Out
          </button>
        ) : (
          <>
            <Link to="/signup" className="btn btn-sm mr-5">
              Sign Up
            </Link>
            <Link to="/signup" className="btn btn-sm">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
