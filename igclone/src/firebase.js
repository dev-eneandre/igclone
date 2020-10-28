import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCv6Nqe3zGVPum64BNvudNoqUN0tmaptZw",
  authDomain: "igclone-1767c.firebaseapp.com",
  databaseURL: "https://igclone-1767c.firebaseio.com",
  projectId: "igclone-1767c",
  storageBucket: "igclone-1767c.appspot.com",
  messagingSenderId: "468216334696",
  appId: "1:468216334696:web:05afbbce00c33467d7eedd",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage } ;
