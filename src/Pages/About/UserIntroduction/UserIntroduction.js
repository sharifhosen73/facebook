import React, { useContext, useEffect, useState } from "react";
import { FaGraduationCap, FaHome, FaMapMarker } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";

const UserIntroduction = () => {
  const { user } = useContext(AuthContext);
  const [information, setInformation] = useState({});
  console.log(information);
  useEffect(() => {
    fetch(`http://localhost:5000/user-personal?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setInformation(data));
  }, [user?.email]);
  return (
    <div className="lg:w-2/5 mx-10 p-5 bg-white my-5 border-2 border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold">Intro</h1>
      <div className="text-base">
        <div className="flex items-center mt-3">
          <p className="text-3xl pr-2">
            <FaGraduationCap />
          </p>
          <p>
            Studied at{" "}
            <span className=" font-bold text-black">
              {information?.university}
            </span>
          </p>
        </div>
        <div className="flex items-center mt-3">
          <p className="text-3xl pr-2">
            <FaGraduationCap />
          </p>
          <p>
            Went to{" "}
            <span className=" font-bold text-black">
              {information?.college}
            </span>
          </p>
        </div>
        <div className="flex items-center mt-3">
          <p className="text-3xl pr-2">
            <FaGraduationCap />
          </p>
          <p>
            Went to{" "}
            <span className=" font-bold text-black">{information?.school}</span>
          </p>
        </div>
        <div className="flex items-center mt-3">
          <p className="text-3xl pr-2">
            <FaHome />{" "}
          </p>
          <p>
            Live in{" "}
            <span className=" font-bold text-black">{information?.live}</span>
          </p>
        </div>
        <div className="flex items-center mt-3">
          <p className="text-3xl pr-2">
            <FaMapMarker />
          </p>
          <p>
            From{" "}
            <span className=" font-bold text-black">{information?.from}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserIntroduction;
