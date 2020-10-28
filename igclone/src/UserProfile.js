import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Avatar } from "@material-ui/core";
// import { db } from "./firebase";

function UserProfile({ username, user }) {
  // const [userImage, setUserImage] = useState("");
  const [user_name, setUser_name] = useState();
  // getting the username of the current logged in user
// setUser_name({
//   user_name : user.displayName
// })
const updateit = () =>  setUser_name({
    username : user.displayName
  })

  return (
    <div className="profile">
      {/* avatar  */}
      {/* username */}
      {/* number of posts  */}
      {/* bio  */}
      {/* email  */}
      {/* logout  */}
      <div className="profile__header">
        <Avatar
          className="profile__avatar"
          alt={username}
          src="/static/images.avatar/1.jpg"
        />
        <h3>{updateit}</h3>
      </div>
    </div>
  );
}

export default UserProfile;
