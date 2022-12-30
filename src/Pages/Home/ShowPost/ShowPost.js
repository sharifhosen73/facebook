import React, { useEffect, useState } from "react";
import ShowPostItem from "./ShowPostItem";

const ShowPost = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post")
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
