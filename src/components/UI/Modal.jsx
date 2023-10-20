import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = ({ children }) => {
  return <div className={classes.modal}>{children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, onClick }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={onClick} />, portalElement)}
      {ReactDOM.createPortal(<Overlay>{children}</Overlay>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;
