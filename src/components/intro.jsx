import React from "react";
import Back from "./back";

const Intro = () => {
  return (
    <>
      <div className="nav__header">
        <div className="nav__left">
          <h1 className="nav__title">SKINSTRIC</h1>
          <button className="nav__btn">[ INTRO ]</button>
        </div>
      </div>
      <p className="bold">To Start Analysis</p>

      <div className="rectangle">
        <div className="intro__text">
          Click To Type
          <textarea className="bold" id="intro">
            Introduce Yourself
          </textarea>
        </div>
      </div>
<Back />
    </>
  );
};

export default Intro;
