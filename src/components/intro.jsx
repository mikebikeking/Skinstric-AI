import React, { useState, useEffect } from "react";
import Back from "./back";
import axios from "axios";
import Proceed from "./proceed";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Intro () {
  const [step, setStep] = useState("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [prompt, setPrompt] = useState("Introduce Yourself");
  const [canSubmit, setCanSubmit] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (step === "location") {
      setPrompt("Where are you from?");
      setCanSubmit(true);
    } else {
      setPrompt("Introduce Yourself");
      setCanSubmit(false);
    }
    setInputValue("");
    setNameError("");
    setLocationError("");
  }, [step]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 0,
    });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const isValid = (text) => {
    return /^[a-zA-Z\s]*$/.test(text);
  };

  const handleNext = () => {
    if (step === "name") {
      if (isValid(inputValue)) {
        setName(inputValue);
        setStep("location");
        setNameError("");
      } else {
        setNameError("Name must contain only letters and spaces.");
      }
    }
  };

  const handleSubmit = async () => {
    if (name && location) {
      if (isValid(name) && isValid(location)) {
        try {
          const response = await axios.post(
            "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
            {
              name: name,
              location: location,
            }
          );
          console.log("API Response:", response.data);
          setSubmissionSuccess(true);
          setNameError("");
          setLocationError("");
        } catch (error) {
          console.error("API Error:", error);
        }
      } else {
        if (!isValid(name)) {
          setNameError("Name must contain only letters and spaces.");
        }
        if (!isValid(location)) {
          setLocationError("Location must contain only letters and spaces.");
        }
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (step === "name") {
        handleNext();
      } else if (step === "location" && canSubmit) {
        setLocation(inputValue);
        handleSubmit();
      }
    }
  };

  return (
    <>
      <div className="nav__header" data-aos="fade-in">
        <div className="nav__left">
          <Link to="/">
            <h1 className="nav__title">SKINSTRIC</h1>
          </Link>
          <button className="nav__btn">[ INTRO ]</button>
        </div>
      </div>
      {submissionSuccess ? (
        <div className="submission__message" >
          <p className="bold">Thank you for submitting!</p>
          <p>Ready for the result? Process for the next Step</p>
        </div>
      ) : (
        <>
          <p className="bold nav__p" data-aos="fade-in">To Start Analysis</p>
          <div className="input" data-aos="fade-in">
            <div className="intro__container">
              <div className="rectangle__intro">
                <div className="intro__text">
                  Click To Type
                  <input
                    className=" input input__text"
                    id="intro"
                    placeholder={prompt}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    data-aos="fade-in"
                  />
                  {step === "name" && nameError && <p className="error-message">{nameError}</p>}
                  {step === "location" && locationError && <p className="error-message">{locationError}</p>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="navigation__bottom" data-aos="fade-in">
        <Back data-aos="fade-in"/> 
        {submissionSuccess && <Proceed data-aos="fade-in" />} 
      </div>
    </>
  );
};

export default Intro;