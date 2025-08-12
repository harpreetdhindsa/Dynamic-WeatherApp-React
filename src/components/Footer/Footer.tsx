import { useState, useEffect } from "react";
import styled from './Footer.module.css';

const Footer = () => {
  const [showBtn, setShowBtn] = useState(false);  //initially showBTn is false and not showing 

   useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.pageYOffset > 300);  //this reads if you have gone>3oo pixels 
    };

    window.addEventListener("scroll", handleScroll); //add the scroll event listerner and listens to it and calls handleScroll 

    return () => window.removeEventListener("scroll", handleScroll); //removing the event listener on cleanup
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //function to bring back user to top
  };

  return (
    <>
    {/*if show button is true ,show Back to Top */}
      {showBtn && (
        <button onClick={scrollToTop} className={styled.btn}>
          ⬆ Back to Top
        </button>
      )}
    </>
  );
};

export default Footer;
