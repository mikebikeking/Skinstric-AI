import React, { useState, useEffect } from "react";
import Nav from "../components/secondNav";
import Back from "../components/back";
import Home from "../components/home";

function Demographics() {
  const [apiData, setApiData] = useState(null);
  const [AgeRange, setAgeRange] = useState(null);
  const [AgeProbabilities, setAgeProbabilities] = useState(null);
  const [RaceProbabilities, setRaceProbabilities] = useState(null);
  const [GenderRange, setGenderRange] = useState(null);
  const [GenderProbabilities, setGenderProbabilities] = useState(null);
  const [topProbability, setTopProbability] = useState(0);
  const [activeButton, setActiveButton] = useState("race");
  const [confidenceLabel, setConfidenceLabel] = useState(
    "Race A.I. CONFIDENCE"
  );
  const [predictionLabel, setPredictionLabel] = useState(
    "Predicted Race & Age"
  );
  const [graphLabel, setGraphLabel] = useState("Race");
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("skinstricApiResponse");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setApiData(parsedData);

      if (parsedData?.data?.age) {
        const sortedAgeProbabilities = Object.entries(parsedData.data.age)
          .sort(([, probA], [, probB]) => probB - probA)
          .reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {});
        setAgeProbabilities(sortedAgeProbabilities);
        setAgeRange(Object.keys(sortedAgeProbabilities)[0] || null);
      }

      if (parsedData?.data?.race) {
        const sortedRaceProbabilities = Object.entries(parsedData.data.race)
          .sort(([, probA], [, probB]) => probB - probA)
          .reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {});
        setRaceProbabilities(sortedRaceProbabilities);

        if (
          activeButton === "race" &&
          Object.values(sortedRaceProbabilities).length > 0
        ) {
          setTopProbability(Object.values(sortedRaceProbabilities)[0] * 100);
        }
      }

      if (parsedData?.data?.gender) {
        const sortedGenderProbabilities = Object.entries(parsedData.data.gender)
          .sort(([, probA], [, probB]) => probB - probA)
          .reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {});
        setGenderProbabilities(sortedGenderProbabilities);
        setGenderRange(Object.keys(sortedGenderProbabilities)[0] || null);
      }
    }

    const storedImage = localStorage.getItem("capturedImage");
    if (storedImage) {
      setCapturedImage(storedImage);
    }
  }, [activeButton]);

  useEffect(() => {
    if (activeButton === "race" && RaceProbabilities) {
      setConfidenceLabel("Race A.I. CONFIDENCE");
      setPredictionLabel("Predicted Race");
      setGraphLabel("Race");
      setTopProbability(Object.values(RaceProbabilities)[0] * 100);
    } else if (activeButton === "age" && AgeProbabilities) {
      setConfidenceLabel("Age A.I. CONFIDENCE");
      setPredictionLabel("Predicted Age");
      setGraphLabel("Age");
      setTopProbability(Object.values(AgeProbabilities)[0] * 100);
    } else if (activeButton === "gender" && GenderProbabilities) {
      setConfidenceLabel("Gender A.I. CONFIDENCE");
      setPredictionLabel("Predicted Gender");
      setGraphLabel("Gender");
      setTopProbability(Object.values(GenderProbabilities)[0] * 100);
    }
    setHighlightedItem(null);
  }, [activeButton, RaceProbabilities, AgeProbabilities, GenderProbabilities]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleConfidenceClick = (item, newProbability, type) => {
    setActiveButton(type);
    setGraphLabel(type.charAt(0).toUpperCase() + type.slice(1));
    setTopProbability(newProbability * 100);
    setHighlightedItem(item);

    if (type === "race" && RaceProbabilities) {
      setPredictionLabel("Predicted Race");
      setConfidenceLabel("Race A.I. CONFIDENCE");
      const newRaceProbabilities = {
        [item]: newProbability,
        ...RaceProbabilities,
      };
      if (
        newRaceProbabilities[Object.keys(RaceProbabilities)[0]] ===
          newProbability &&
        Object.keys(newRaceProbabilities)[0] !== item
      ) {
        delete newRaceProbabilities[
          Object.keys(RaceProbabilities)[
            Object.keys(newRaceProbabilities).indexOf(item)
          ]
        ];
      }
      setRaceProbabilities(newRaceProbabilities);
    } else if (type === "age" && AgeProbabilities) {
      setPredictionLabel("Predicted Age");
      setConfidenceLabel("Age A.I. CONFIDENCE");
      setAgeRange(item);
    } else if (type === "gender" && GenderProbabilities) {
      setPredictionLabel("Predicted Gender");
      setConfidenceLabel("Gender A.I. CONFIDENCE");
      setGenderRange(item);
    }
  };

  return (
    <>
      <Nav />
      <div
        className="dem__header"
        style={{ textAlign: "left", fontSize: "1.1em" }}
      >
        <h2>A.I. Analysis</h2>
        <h1>DEMOGRAPHICS</h1>
        <p>{predictionLabel}</p>
      </div>

      <div className="dem__container">
        <div className="dem__button">
          <button
            className={`dem__buttons ${
              activeButton === "race" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("race")}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <span>Race</span>
              {RaceProbabilities ? (
                <span style={{ marginTop: "5px" }}>
                  {Object.keys(RaceProbabilities)[0]}
                </span>
              ) : (
                <span style={{ marginTop: "5px" }}>Race</span>
              )}
            </div>
          </button>
          <button
            className={`dem__buttons ${activeButton === "age" ? "active" : ""}`}
            onClick={() => handleButtonClick("age")}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <span>Age</span>
              {AgeRange ? (
                <span style={{ marginTop: "5px" }}>{AgeRange}</span>
              ) : (
                <span style={{ marginTop: "5px" }}>Age</span>
              )}
            </div>
          </button>
          <button
            className={`dem__buttons ${
              activeButton === "gender" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("gender")}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <span>Gender</span>
              {GenderRange ? (
                <span style={{ marginTop: "5px" }}>{GenderRange}</span>
              ) : (
                <span style={{ marginTop: "5px" }}>Gender</span>
              )}
            </div>
          </button>
        </div>

        <div className="dem__graph">
          <div className="graph__container">
            <div className="circular__progress--card">
              <div className="circular__progress--wrapper">
                <svg className="circular__progress--svg" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="circular__progress--bg"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="circular__progress--bar"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray="250"
                    strokeDashoffset={`${250 - (topProbability / 100) * 250}`}
                    transform="rotate(-90 50 50)"
                    cx="50"
                    cy="50"
                    r="40"
                  ></circle>
                </svg>
                <div className="circular__progress--text">
                  <p className="percentage">{topProbability.toFixed(0)}%</p>
                </div>
              </div>
              <p className="label__primary">{graphLabel}</p>
            </div>
          </div>
          <div className="graph__text">
            <p>If A.I. estimate is wrong, select the correct one.</p>
          </div>
        </div>

        <div className="dem__percent">
          <div className="confidence__label--header">{confidenceLabel}</div>
          <ul className="percent__data">
            {activeButton === "race" &&
              RaceProbabilities &&
              Object.entries(RaceProbabilities)
                .sort(([, probA], [, probB]) => probB - probA)
                .map(([race, probability]) => (
                  <li
                    key={race}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      fontWeight: highlightedItem === race ? "bold" : "normal",
                      color: highlightedItem === race ? "black" : "inherit",
                    }}
                    onClick={() =>
                      handleConfidenceClick(race, probability, "race")
                    }
                  >
                    <span
                      style={{
                        fontWeight:
                          highlightedItem === race ? "bold" : "normal",
                      }}
                    >
                      {race}
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      {(probability * 100).toFixed(2)}%
                    </span>
                  </li>
                ))}
            {activeButton === "age" &&
              AgeProbabilities &&
              Object.entries(AgeProbabilities)
                .sort(([, probA], [, probB]) => probB - probA)
                .map(([age, probability]) => (
                  <li
                    key={age}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      fontWeight: highlightedItem === age ? "bold" : "normal",
                      color: highlightedItem === age ? "black" : "inherit",
                    }}
                    onClick={() =>
                      handleConfidenceClick(age, probability, "age")
                    }
                  >
                    <span
                      style={{
                        fontWeight: highlightedItem === age ? "bold" : "normal",
                      }}
                    >
                      {age}
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      {(probability * 100).toFixed(2)}%
                    </span>
                  </li>
                ))}
            {activeButton === "gender" &&
              GenderProbabilities &&
              Object.entries(GenderProbabilities)
                .sort(([, probA], [, probB]) => probB - probA)
                .map(([gender, probability]) => (
                  <li
                    key={gender}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      fontWeight:
                        highlightedItem === gender ? "bold" : "normal",
                      color: highlightedItem === gender ? "black" : "inherit",
                    }}
                    onClick={() =>
                      handleConfidenceClick(gender, probability, "gender")
                    }
                  >
                    <span
                      style={{
                        fontWeight:
                          highlightedItem === gender ? "bold" : "normal",
                      }}
                    >
                      {gender}
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      {(probability * 100).toFixed(2)}%
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <div className="navigation__bottom">
        <Back />
        <Home />
      </div>
    </>
  );
}

export default Demographics;
