import React from "react";
import buttonIcon from "../assets/button-icon-shrunk-flip.png";
import { Link, useLocation } from "react-router-dom";

function Proceed() {
  const location = useLocation();
  const navigateTo = location.pathname === "/analysis" ? "/results" : "/select";

  return (
    <div className="proceed__container">
      <Link to={navigateTo}>
        <div className="proceed__display">
          Proceed<img src={buttonIcon} className="btn__icon" alt="Proceed" />
        </div>
      </Link>
    </div>
  );
}

export default Proceed;