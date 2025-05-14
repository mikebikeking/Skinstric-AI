import React, { useRef, useState } from "react";
import gallery from "../assets/gallery-icon.png";
import shutter from "../assets/shutter-icon.png";
import Nav from "../components/nav";
import Back from "../components/back";
import Proceedapi from "../components/proceedapi";
import { useNavigate } from 'react-router-dom';

function Results() {
  const fileInputRef = useRef(null);
  const [base64Image, setBase64Image] = useState(null);
  const navigate = useNavigate();

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
      console.log("Base64 Image set:", reader.result ? "Yes" : "No");
    };
    reader.readAsDataURL(file);
  };

  const callSkinstricAPI = async (base64Data) => {
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Data }),
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem('skinstricApiResponse', JSON.stringify(data));
      navigate('/demographics');
    } catch (error) {
      console.error("Error calling Skinstric API:", error);
    }
  };

  const handleProceedClick = () => {
    console.log("Proceed button clicked");
    if (base64Image) {
      callSkinstricAPI(base64Image);
    } else {
      console.warn("No image uploaded to proceed.");
    }
  };

  return (
    <>
      <Nav />
      <p className="bold nav__p">To Start Analysis</p>
      <div className="ai__home">
        Allow A.I. to scan your face
        <img src={shutter} className="shutter" alt="Shutter" />
        <img
          src={gallery}
          className="gallery"
          alt="Camera"
          onClick={handleGalleryClick}
          style={{ cursor: "pointer" }}
        />
        Allow A.I. access to gallery
      </div>
      {base64Image && (
        <div>
          <img
            src={base64Image}
            alt="Uploaded Preview"
            style={{ maxWidth: "200px" }}
          />
        </div>
      )}
      <div className="navigation__bottom">
        <Back />
        {base64Image && <Proceedapi onClick={handleProceedClick} />}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default Results;