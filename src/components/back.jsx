import React from 'react'
import buttonIcon from "../assets/button-icon-shrunk.png";
import { Link } from 'react-router-dom';

function back() {
  return (
    <div className="back__container">
      <Link to="/">
        <div className='back__display'>
          <img src={buttonIcon}  className="btn__icon" alt="Back" />Back
        </div>
      </Link>
      
    </div>
  )
}

export default back