import React from 'react'
import buttonIcon from "../assets/button-icon-shrunk-flip.png";
import { Link } from 'react-router-dom';

function home() {
  return (
    <div className="back__container">
      <Link to="/">
        <div className='back__display'>
          <img src={buttonIcon}  className="btn__icon" alt="Home" />Home
        </div>
      </Link>
      
    </div>
  )
}

export default home