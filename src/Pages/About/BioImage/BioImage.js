import React, { useContext } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import UserIntroModal from "../UserIntroduction/UserIntroModal";

const BioImage = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className=" bg-base-100 shadow-xl">
      <div className="lg:w-[1080px] mx-auto">
        <div>
          <img
            className="lg:w-[1080px] h-96 relative"
            src="https://scontent.fdac152-1.fna.fbcdn.net/v/t39.30808-6/284927392_3122622081384843_7144210107847605172_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeE91DAgdohNLhcBSdnBKGVHQlPjwfivniZCU-PB-K-eJgqlgI9Z4Ich8toicIj3edvzar5DiyAhXrdq4_rojBY5&_nc_ohc=hYiztpIKvfYAX-34Db_&_nc_ht=scontent.fdac152-1.fna&oh=00_AfDjSZ6fyXQOVviR-kEFa9PV0q4ZhCMOtL0yMJ0O02tHXA&oe=63AFBBC3"
            alt=""
          />
        </div>
        <div className="flex justify-around mb-8">
          <div className="lg:w-3/5 flex justify-between">
            <div className="w-2/6">
              <img
                src={user?.photoURL}
                className="w-32 h-32 lg:w-44 lg:h-44 rounded-full absolute -mt-10 mr-52 border-4"
                alt=""
              />
            </div>
            <div className="lg:w-full p-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-black">
                MD Sharif Hosen
              </h2>
              <Link className="text-xl font-semibold text-gray-600 hover:underline">
                102 friends
              </Link>
              <label
                htmlFor="my-modal-4"
                className="-mt-24 -ml-1 lg:-ml-14 lg:-mt-10 absolute text-2xl h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full"
              >
                <FaCamera />
              </label>
            </div>
          </div>
          <div className="w-1/5">
            <label
              htmlFor="my-modal-4"
              className="btn bg-white text-black border-none hover:bg-white absolute -mt-20 "
            >
              <FaCamera /> <span className="px-2 ">Edit cover photo</span>
            </label>

            <label
              htmlFor="userIntroModal"
              className="btn bg-gray-200 text-black border-none hover:bg-gray-300 mt-20 text-base  "
            >
              <FaPen /> <span className="px-2 ">Edit profile</span>
            </label>
          </div>
        </div>
        <hr />
        <div className="py-6">
          <Link className="text-xl font-semibold text-gray-600 pl-10">
            Posts
          </Link>
          <Link className="text-xl font-semibold text-gray-600 pl-10">
            About
          </Link>
          <Link className="text-xl font-semibold text-gray-600 pl-10">
            Friends
          </Link>
          <Link className="text-xl font-semibold text-gray-600 pl-10">
            Photos
          </Link>
          <Link className="text-xl font-semibold text-gray-600 pl-10">
            Videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BioImage;
