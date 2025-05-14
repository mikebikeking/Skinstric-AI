import React from 'react'
import buttonIcon from "../assets/button-icon-shrunk-flip.png";
import { Link } from 'react-router-dom';

function back() {
  return (
    <div className="proceed__container">
      <Link to="#">
        <div className='proceed__display'>
          <img src={buttonIcon}  className="btn__icon" alt="Get Summary" />Get Summary
        </div>
      </Link>
      
    </div>
  )
}

export default back