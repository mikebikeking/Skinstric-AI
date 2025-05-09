import React from 'react';

function LoadingScreen() {
    return (
      <div className="loading__overlay">
        <div className="spinner"></div>
        <p>Processing...</p>
      </div>
    );
  }
  
  export default LoadingScreen;