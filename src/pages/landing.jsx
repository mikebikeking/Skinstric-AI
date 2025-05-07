import React from "react";
import { Link } from "react-router-dom";
import buttonIcon from "../assets/button-icon-shrunk.png";
import buttonIconFlip from "../assets/button-icon-shrunk-flip.png";
import Nav from "../components/nav";

const Landing = () => {
  return (
    <>
      <Nav />
      <div className="landing">
        <div className="rectangle__left">
          <Link to="#" className="lan__btn">
            <span>
              <img src={buttonIcon} className="btn__icon" alt="Discover AI" />
              Discover A.I.
            </span>
          </Link>
        </div>
        <h1 className="title">
          Sophisticated
          <br /> skincare
        </h1>
        <div className="rectangle__right">
          <Link to="/analysis" className="lan__btn">
            <span>
              Take Test
              <img src={buttonIconFlip} className="btn__icon" alt="Take Test" />
            </span>
          </Link>
        </div>
      </div>
      <div>
        <p className="landing__text">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>
    </>
  );
};

export default Landing;