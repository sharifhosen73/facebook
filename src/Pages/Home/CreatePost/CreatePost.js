import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";
import PostModal from "../PostModal/PostModal";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostImage = (data) => {
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
          const createPost = {
            name: user.displayName,
            email: user.email,
            posterImg: user?.photoURL,
            image: imageData.data.url,
          };

          console.log(createPost);

          fetch(
            "https://social-media-application-server-three.vercel.app/post",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(createPost),
            }
          )
            .then((res) => {
              res.json();
            })
            .then((data) => {
              console.log(data.acknowledged, "acknowledged");
            });
        }
      });
  };

  return (
    <div className="card bg-base-100 m-4 rounded-lg border-2 border-gray-300 p-14 ">
      <div className="flex">
        <img
          className="w-[60px] h-[60px] rounded-full border-none mr-8"
          src={user?.photoURL}
          alt=""
        />
        <label
          htmlFor="createPost"
          className="text-gray-500 hover:bg-gray-200 w-11/12 py-3 rounded-3xl text-xl"
        >
          What's your mind{" "}
          <span className="text-gray-700 font-semibold">
            {user?.displayName}
          </span>
          ?
        </label>
        <PostModal />
      </div>
    </div>
  );
};

export default CreatePost;
