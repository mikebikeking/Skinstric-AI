import React, { useEffect, useRef, useState } from "react";
import gallery from "../assets/gallery-icon.png";
import shutter from "../assets/shutter-icon.png";
import Nav from "../components/nav";
import Back from "../components/back";
import Proceedapi from "../components/proceedapi";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function CameraPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
      offset: 0, 
    });

    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera on camera page:", error);
      }
    }

    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div data-aos="fade-in">
      <Nav />
      <h2>Camera View</h2>
      <video ref={videoRef} width="400" height="300" autoPlay />{" "}
    </div>
  );
}

function Results() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [base64Image, setBase64Image] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
      offset: 0, 
    });
  }, []);

  const handleShutterClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      navigate("/camera");
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera access denied. Please check your browser permissions.");
    }
  };

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
    setIsLoading(true);
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
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("skinstricApiResponse", JSON.stringify(data));
      setIsLoading(false);
      navigate("/demographics");
    } catch (error) {
      console.error("Error calling Skinstric API:", error);
      setIsLoading(false);
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
      <Nav data-aos="fade-in" />
      <p className="bold nav__p" data-aos="fade-in">To Start Analysis</p>
      <div className="ai__home" data-aos="fade-in">
        Allow A.I. to scan your face
        <img
          src={shutter}
          className="shutter"
          alt="Shutter"
          onClick={handleShutterClick}
          style={{ cursor: "pointer" }}
          data-aos="fade-in"
          data-aos-delay="100" 
        />{" "}
        <img
          src={gallery}
          className="gallery"
          alt="Camera"
          onClick={handleGalleryClick}
          style={{ cursor: "pointer" }}
          data-aos="fade-in"
          data-aos-delay="200"
        />
        Allow A.I. access to gallery
      </div>{" "}
      {base64Image && (
        <div data-aos="fade-in">
          {" "}
          <img
            src={base64Image}
            alt="Uploaded Preview"
            style={{ maxWidth: "200px" }}
          />{" "}
        </div>
      )}{" "}
      {isLoading && (
        <div className="loading-overlay" data-aos="fade-in">
          <div className="loading-text">Loading...</div>{" "}
        </div>
      )}{" "}
      <div className="navigation__bottom" data-aos="fade-in">
        <Back data-aos="fade-in" data-aos-delay="100" />{" "}
        {base64Image && <Proceedapi onClick={handleProceedClick} data-aos="fade-in" data-aos-delay="200" />}{" "}
      </div>{" "}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />{" "}
    </>
  );
}

export default Results;