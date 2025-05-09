import React, { useRef, useState } from "react";
import gallery from "../assets/gallery-icon.png";
import shutter from "../assets/shutter-icon.png";
import Nav from "../components/nav";
import Back from "../components/back";
import Proceed from "../components/proceed";

function Results() {
  const fileInputRef = useRef(null);
  const [base64Image, setBase64Image] = useState(null);

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
      callSkinstricAPI(reader.result);
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
    } catch (error) {
      console.error("Error calling Skinstric API:", error);
    }
  };

  const handleProceedClick = () => {
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
        {base64Image && <Proceed onClick={handleProceedClick} />}
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