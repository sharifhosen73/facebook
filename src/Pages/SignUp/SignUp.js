import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "./../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const { user, googleLogin, createUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const navigate = useNavigate();

  const handleSignUp = (data) => {
    const image = data.image[0];

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          console.log(imageData.data.url);

          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              navigate("/");
              const userInfo = {
                displayName: data.name,
                photoURL: imageData.data.url,
              };

              saveUser(data.name, data.email, imageData.data.url);

              updateUser(userInfo)
                .then(() => {})
                .catch((error) => console.log(error));
            })
            .then((error) => console.log(error));
        }
      });
  };

  const handleGoogle = () => {
    googleLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .then((error) => console.error(error));
  };

  const saveUser = (name, email, photoURL) => {
    const user = { name, email, photoURL };
    fetch("https://social-media-application-server-three.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="w-2/6 mx-auto mt-16">
      <h1 className="text-5xl font-bold text-primary text-center py-10">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            placeholder="Name"
            className="input input-bordered my-3"
          />
        </div>

        <div className="form-control">
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="input input-bordered my-3"
          />
        </div>

        <div className="form-control">
          <input
            type="password"
            name="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input input-bordered my-3"
          />
        </div>

        {/* <div className="form-control">
          <input
            type="password"
            name="confirmPassword"
            {...register("confirm", { required: true })}
            placeholder="Confirm Password"
            className="input input-bordered my-3"
          />
        </div> */}

        <div className="form-control">
          <input
            type="file"
            name="file"
            {...register("image", { required: true })}
            className="input input-bordered my-3 py-2"
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full mt-3 text-xl"
          value="Sign Up"
        />
      </form>
      <button
        onClick={handleGoogle}
        className="btn btn-outline btn-primary text-xl w-full mt-3"
      >
        <FaGoogle className="" />
        <span className="px-3">Sign In Google</span>
      </button>
      <p className="mt-20 text-center text-xl">
        Have an Account{" "}
        <Link to="/signin" className="text-primary">
          Please Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
