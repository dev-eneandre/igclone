import React, { useState } from "react";
import { makeStyles, Modal, Button } from "@material-ui/core";
import "./Modals.css";

// material ui code
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// material ui code ending

function SigninModal({
  open,
  setOpenSignIn,
  email,
  setEmail,
  password,
  setPassword,
  signIn,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  return (
    <div>
      <Modal open={open} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signin">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="ig logo"
              />
            </center>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default SigninModal;
