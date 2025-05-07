import React from "react";
import buttonIcon from "../assets/button-icon-shrunk-flip.png";
import { Link } from "react-router-dom";

function proceed() {
  return (
    <div className="proceed__container">
      <Link to="/results">
        <div className="proceed__display">
         Proceed<img src={buttonIcon} className="btn__icon" alt="Proceed"/>
        </div>
      </Link>
    </div>
  );
}

export default proceed;