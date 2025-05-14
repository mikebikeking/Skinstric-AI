import React from "react";
import Nav from "../components/secondNav";
import Back from "../components/back";
import Summary from "../components/summary";
import { Link } from "react-router-dom";

function select() {
  return (
    <>
      <Nav />
      <div className="bold nav__p">a.i. analysis</div>
      <div className="analysis__para">
        <p>A.I. HAS ESTIMATED THE FOLLOWING.</p>
        <p>FIX ESTIMATED INFORMATION IF NEEDED.</p>
      </div>
      <div className="diamond__container">
        <Link to="/demographics" className="diamond__item top">
          <button className="diamond__button">
            <span className="transform -rotate-45">Demographics</span>
          </button>
        </Link>
        <Link to="#" className="diamond__item left">
          <button className="diamond__button">
            <span className="transform -rotate-45">Cosmetic Concerns</span>
          </button>
        </Link>
        <Link to="#" className="diamond__item right">
          <button className="diamond__button">
            <span className="transform -rotate-45">Skin Type Details</span>
          </button>
        </Link>
        <Link to="#" className="diamond__item bottom">
          <button className="diamond__button">
            <span className="transform -rotate-45">Weather</span>
          </button>
        </Link>
      </div>
      <div className="navigation__bottom">
        <Back />
        <Summary />
      </div>
    </>
  );
}

export default select;
