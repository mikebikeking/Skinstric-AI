import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Analysis from "./pages/analysis";
import Results from "./pages/results";
import Select from "./pages/select";
import Demographics from "./pages/demographics";
import Camera from "./components/camera";


function App() {
 

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/results" element={<Results />} />
          <Route path="/select" element={<Select />} />
          <Route path="/demographics" element={<Demographics />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;