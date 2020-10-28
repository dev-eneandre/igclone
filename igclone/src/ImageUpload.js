import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState();
  const [image, setImage] = useState(0);
  const [progress, setProgress] = useState(null);

  const handleChange = (e) => {
    //   set the first selected file link to setImage 👇
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    //   get ref to the photo selected 👇 and "put" the grabbed image into the point(const)
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      // 👇  as it gets uploaded keep giving the snapshot of the progress
      "state_changed",
      (snapshot) => {
        //progress function..vid ref==>2:27:55 ..
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      //  if anything goes wrong during the upload 👇
      (error) => {
      //  error function
      console.log(error)
      alert(error.message);
      }, 
    //   where the upload completes 
      () => {
        //   conpletes the function 
        // 👇 this gives the download link  
        storage
         .ref("images")
         .child(image.name)
         .getDownloadURL()
        //  then do something with the url 
         .then(url => {
            // we now want to post the image inside the db 
            db.collection("posts").add({
                // 👇  timestamp helps sort the code by its correct timing 
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                caption : caption,
                imageUrl: url ,
                username : username
            })
            setProgress(0);
            setCaption("");
            setImage(null);
         })
      }
    );
  };
  return (
    <div className="imageupload">
        <progress className="imageupload__progress"
        value={progress}
        max="100"
        />
      <input
        type="text"
        onChange={(event) => setCaption(event.target.value)}
        placeholder="enter a caption"
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
