import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "./../../../contexts/AuthProvider";
import { FaThumbsUp, FaRegComment, FaRegPaperPlane } from "react-icons/fa";

const PostDetails = () => {
  const post = useLoaderData();

  const { _id, image, name, email, posterImg } = post;
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [like, setLike] = useState(true);
  const [comment, setComment] = useState(false);
  const [postComment, setPostComment] = useState([]);

  useEffect(() => {
    fetch(
      `https://social-media-application-server-three.vercel.app/comment/${_id}`
    )
      .then((res) => res.json())
      .then((data) => setPostComment(data));
  }, [_id]);

  const handleLike = () => {
    setLike(!like);
    const userLike = {
      likePost: _id,
      name: user?.displayName,
      email: user?.email,
      like,
    };
    fetch("https://social-media-application-server-three.vercel.app/like", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userLike),
    })
      .then(() => {})
      .then((data) => {
        console.log(data);
      });
  };

  const handleComment = (data) => {
    const comment = {
      commentPost: _id,
      name: user?.displayName,
      email: user?.email,
      comment: data.comment,
    };
    console.log(comment);
    fetch("https://social-media-application-server-three.vercel.app/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComment(!comment);
      });
  };
  return (
    <div className="card card-compact px-2 m-4 rounded-lg border-2 border-gray-300 bg-base-100 ">
      <div className="flex items-center my-5">
        <img
          className="w-[60px] h-[60px] rounded-full border-none "
          src={posterImg}
          alt=""
        />
        <div className="pl-2 ">
          <h2 className="text-xl font-bold text-black ">{name}</h2>
          <Link
            to={`/single-post/${_id}`}
            className="btn btn-xs bg-teal-400 hover:bg-teal-600 border-none text-black hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
      <img src={image} alt="Shoes" />

      <div className="flex items-center py-5 justify-around">
        <div className="flex text-2xl  items-center">
          <span onClick={handleLike}>
            {like ? <FaThumbsUp /> : <FaThumbsUp className="text-blue-500" />}
          </span>{" "}
          <span className="text-xl px-2">Like</span>
        </div>
        <div className="flex text-2xl items-center">
          <span onClick={() => setComment(!comment)}>
            <FaRegComment />
          </span>
          <span className="text-xl px-2">Comment</span>
        </div>
      </div>
      <div>
        {comment && (
          <form
            onSubmit={handleSubmit(handleComment)}
            className="flex items-center w-11/12 mx-auto my-5 "
          >
            <textarea
              className="textarea w-full pr-20"
              name="comment"
              {...register("comment")}
              placeholder="Comment"
            ></textarea>
            <button className="btn -ml-16 text-base">
              <FaRegPaperPlane />
            </button>
          </form>
        )}
      </div>
      <hr />
      <div>
        {postComment.map((comment) => (
          <div key={comment._id}>
            <div className="card border-2  border-gray-300 m-5">
              <div className="flex justify-between py-5 px-3">
                <div>
                  <h2 className="card-title">{comment.name}</h2>
                  <p>{comment.comment}</p>
                </div>
                <div>
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
