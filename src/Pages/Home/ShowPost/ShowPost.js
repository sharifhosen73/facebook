import React, { useEffect, useState } from "react";
import ShowPostItem from "./ShowPostItem";

const ShowPost = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("https://social-media-application-server-three.vercel.app/post")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);
  return (
    <div>
      {post.map((post) => (
        <ShowPostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ShowPost;
