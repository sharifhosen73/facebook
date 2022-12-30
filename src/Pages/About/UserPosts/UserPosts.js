import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider.js";

import UserPostShow from "./UserPostShow.js";

const UserPosts = () => {
  const user = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  console.log("Hello Man", user.user?.email);
  useEffect(() => {
    fetch(`http://localhost:5000/user-post?email=${user.user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserPosts(data));
  }, [user.user?.email]);
  return (
    <div>
      {userPosts.map((post) => (
        <UserPostShow key={post._id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
