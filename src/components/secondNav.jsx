import React from 'react';
import { Link } from 'react-router-dom';


function secondNav(){
  return (
    <div className="nav__header">
      <div className="nav__left">
      <Link to="/">
        <h1 className="nav__title">SKINSTRIC</h1>
        </Link>
        <button className="nav__btn">[ ANALYSIS ]</button>
      </div>
    </div>
  );
};

export default secondNav;