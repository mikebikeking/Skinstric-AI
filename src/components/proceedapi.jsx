import React from "react";
import buttonIcon from "../assets/button-icon-shrunk-flip.png";

function Proceedapi({ onClick }) {
  return (
    <div className="proceed__container">
      <div className="proceed__display" onClick={onClick} style={{ cursor: 'pointer' }}>
        Proceed<img src={buttonIcon} className="btn__icon" alt="Proceed" />
      </div>
    </div>
  );
}

export default Proceedapi;