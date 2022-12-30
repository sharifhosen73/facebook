import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";

const PostModal = () => {
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreatePost = (data) => {
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
            caption: data.caption,
            image: imageData.data.url,
          };

          fetch("http://localhost:5000/post", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(createPost),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="createPost" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="createPost"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-3xl font-bold text-center">Create Post</h3>
          <form onSubmit={handleSubmit(handleCreatePost)}>
            <div className="form-control">
              <textarea
                className="textarea textarea-bordered"
                {...register("caption")}
                placeholder="Caption"
              ></textarea>
            </div>

            <div className="form-control">
              <input
                multiple
                type="file"
                {...register("image")}
                className="input input-bordered my-3 pt-2"
              />
            </div>
            <label
              htmlFor="createPost"
              className="btn btn-primary w-full mt-3 text-xl"
            >
              <input type="submit" value="Create Post" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
