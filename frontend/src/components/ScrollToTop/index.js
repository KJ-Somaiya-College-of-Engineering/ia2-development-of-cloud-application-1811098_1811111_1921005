import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import "./styles.scss";

const ScrollToTop = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ScrollListener = document.addEventListener("scroll", (event) => {
      setVisible(window.scrollY > 25);
    });
    return () => {
      document.removeEventListener("scroll", ScrollListener);
    };
  }, []);
  function scrollOnClick() {
    console.log("here");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <Button
      onClick={scrollOnClick}
      className={`scrollToTop ${visible && "scroll-btn-visible"}`}
    >
      <BsArrowUpShort size={50} />
    </Button>
  );
};

export default ScrollToTop;
