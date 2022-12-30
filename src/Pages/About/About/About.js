import React from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import BioImage from "../BioImage/BioImage";
import CoverPhotoModal from "../CoverPhotoModal/CoverPhotoModal";
import UserIntroduction from "../UserIntroduction/UserIntroduction";
import CreatePost from "../../Home/CreatePost/CreatePost.js";
import UserPosts from "../UserPosts/UserPosts";
import UserIntroModal from "./../UserIntroduction/UserIntroModal";
import Footer from "../../Shared/Footer/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="">
          <BioImage />
          <CoverPhotoModal />
        </div>
        <div className="flex flex-col lg:flex-row lg:w-[1080px] mx-auto">
          <UserIntroduction />
          <UserIntroModal />
          <div className="lg:w-3/5 my-5 px-5">
            <CreatePost />
            <UserPosts />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
