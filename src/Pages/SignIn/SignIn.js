import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "./../../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const { googleLogin, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
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

  return (
    <div className="w-2/6 mx-auto mt-32">
      <h1 className="text-5xl font-bold text-primary text-center py-10">
        Sign In
      </h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
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

        <input
          type="submit"
          className="btn btn-primary w-full mt-3 text-xl"
          value="Sign In"
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
        New User?{" "}
        <Link to="/signup" className="text-primary">
          Please Create Account
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
