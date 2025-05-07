import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Analysis from './components/analysis'; 

function App() {
  return (
    <Router>
      <>
        
        <Routes>
          <Route path="/" element={<Landing />} /> 
          <Route path="/analysis" element={<Analysis />} /> 
        </Routes>
      </>
    </Router>
  );
}

export default App;