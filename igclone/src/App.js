import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Button } from "@material-ui/core";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import UserProfile from "./UserProfile";

function App() {
  const [posts, setPosts] = useState([]);
  // 👇  checks if the modal is open or not
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // user that is logged in set to no user initially  👇
  const [user, setUser] = useState(null);

  useEffect(() => {
    // onAuthStateChanged listens for everytime authentication change has been made
    // and onAuthStateChange actually keeps u logged in cos state is nt persistent
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      //perfrm some cleanups
      unsubscribe();
      // 1:52 ref
    };
  }, [user, username]);
  // 👆  anytime the username or user changes the useeffect runs

  useEffect(() => {
    //this is where the code runs
    db.collection("posts")
      // 👆 db from firebse and posts is the name of the collection
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
    // 👆  takes not of every change made in the db, it is fired eveyrtime change is made
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <SignupModal
        open={open}
        setOpen={setOpen}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signUp={signUp}
      />
      <SigninModal
        open={openSignIn}
        setOpenSignIn={setOpenSignIn}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signIn={signIn}
      />

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="ig logo"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => {
            return (
              <Post
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                randome={post.randome}
                key={id}
                PostId={id}
                user={user}
              />
            );
          })}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/CC-vAQHs8WN/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
          {/* <UserProfile 
              // user={user} 
              username={username} 
              // email={email} 
          /> */}
        </div>
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h4>Sorry, Login to upload</h4>
      )}
    </div>
  );
}

export default App;
//https://images.unsplash.com/photo-1533973427779-4b8c2eb4c3cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60
