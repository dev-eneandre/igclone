import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";

function Post({ PostId , user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  // 👇 takes not of individuual comments 
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (PostId) {
      unsubscribe = db
        .collection("posts")
        .doc(PostId)                         
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [PostId]);
// to post a comment to the db 
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts")
    .doc(PostId)
    .collection("comments")
    .add({
      text : comment,
      username : user.displayName,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()  
    }); 
    setComment("");
  }
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images.avatar/1.jpg"
        />
        <h3 className="post__username">{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="users post" />
      <h4 className="post__text">
        <strong className="post__user">{username}</strong>
        {caption}
      </h4>
    
        <div className="post__comments">
          {
            comments.map((comment, PostId) => (
              <p key={PostId}>
                <strong>{comment.username}</strong>
                  {comment.text}
                </p>
            ))
          }
        </div>
        {/* Add comments only if user is logged in  */}
    {
      user && (
        <form className="post__commentBox">
        <Input
          className="post__input"
          type="text"
          placeholder="Add a comment.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </Button>
      </form>
      )
    }
    </div>
  );
}

export default Post;
// https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
