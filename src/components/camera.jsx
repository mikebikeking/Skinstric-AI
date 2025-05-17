import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCamera(false);
      }
    }

    getCameraStream();

    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && hasCamera) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imageDataURL = canvas.toDataURL("image/png");
      console.log("Captured Image:", imageDataURL);
      localStorage.setItem("capturedImage", imageDataURL);
      stopCamera();
      navigate("/demographics");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "black",
      }}
    >
      {" "}
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />{" "}
      {hasCamera ? (
        <button
          onClick={captureImage}
          style={{
            position: "absolute",
            bottom: "20px",
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Take Picture
        </button>
      ) : (
        <p style={{ color: "white" }}>Camera access denied or not available.</p>
      )}
      {" "}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "8px 15px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
      {" "}
    </div>
  );
}

export default Camera;
