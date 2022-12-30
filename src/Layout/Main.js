import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <div className="w-1/4 hidden lg:flex">Left Side Navbar</div>
        <div className=" lg:w-1/2 lg:mx-32">
          <Outlet />
        </div>
        <div className="w-1/4 hidden lg:flex">Right Side Navbar</div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
