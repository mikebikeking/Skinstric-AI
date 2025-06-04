import React, { useState, useEffect } from "react";
import Nav from "../components/secondNav";
import Back from "../components/back";
import Home from "../components/home";
import AOS from "aos";
import "aos/dist/aos.css";

function Demographics() {
  const [apiData, setApiData] = useState(null);
  const [AgeRange, setAgeRange] = useState(null);
  const [AgeProbabilities, setAgeProbabilities] = useState(null);
  const [RaceProbabilities, setRaceProbabilities] = useState(null);
  const [GenderRange, setGenderRange] = useState(null);
  const [GenderProbabilities, setGenderProbabilities] = useState(null);
  const [topProbability, setTopProbability] = useState(0);
  const [activeButton, setActiveButton] = useState("race");
  const [confidenceLabelDynamic, setConfidenceLabelDynamic] = useState("Race");
  const [predictionLabel, setPredictionLabel] = useState(
    "Predicted Race & Age"
  );
  const [graphLabel, setGraphLabel] = useState("Race");
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
      setConfidenceLabelDynamic("Race");
      setPredictionLabel("Predicted Race");
      setGraphLabel("Race");
      setTopProbability(Object.values(RaceProbabilities)[0] * 100);
    } else if (activeButton === "age" && AgeProbabilities) {
      setConfidenceLabelDynamic("Age");
      setPredictionLabel("Predicted Age");
      setGraphLabel("Age");
      setTopProbability(Object.values(AgeProbabilities)[0] * 100);
    } else if (activeButton === "gender" && GenderProbabilities) {
      setConfidenceLabelDynamic("Gender");
      setPredictionLabel("Predicted Gender");
      setGraphLabel("Gender");
      setTopProbability(Object.values(GenderProbabilities)[0] * 100);
    }
    setHighlightedItem(null);
    AOS.refresh();
  }, [activeButton, RaceProbabilities, AgeProbabilities, GenderProbabilities]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const getGraphData = () => {
    if (activeButton === "race" && RaceProbabilities) {
      return Object.keys(RaceProbabilities)[0] || "Race";
    } else if (activeButton === "age" && AgeRange) {
      return `${AgeRange} y.o.`;
    } else if (activeButton === "gender" && GenderRange) {
      return GenderRange || "Gender";
    }
    return "";
  };

  const handleConfidenceClick = (item, newProbability, type) => {
    setActiveButton(type);
    setGraphLabel(type.charAt(0).toUpperCase() + type.slice(1));
    setTopProbability(newProbability * 100);
    setHighlightedItem(item);

    if (type === "race" && RaceProbabilities) {
      setPredictionLabel("Predicted Race");
      setConfidenceLabelDynamic("Race");
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
      setConfidenceLabelDynamic("Age");
      setAgeRange(item);
    } else if (type === "gender" && GenderProbabilities) {
      setPredictionLabel("Predicted Gender");
      setConfidenceLabelDynamic("Gender");
      setGenderRange(item);
    }
  };

  return (
    <>
      <Nav />
      <div
        className="dem__header"
        style={{ textAlign: "left", fontSize: "1.1em" }}
        data-aos="fade-in"
      >
        <h2>A.I. Analysis</h2>
        <h1 data-aos="fade-in" data-aos-delay="100">
          DEMOGRAPHICS
        </h1>
        <p data-aos="fade-in" data-aos-delay="200">
          {predictionLabel}
        </p>
      </div>

      <div className="dem__container" data-aos="fade-in" data-aos-delay="300">
        <div className="dem__button">
          <button
            className={`dem__buttons ${
              activeButton === "race" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("race")}
            data-aos="fade-in"
            data-aos-delay="400"
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
            data-aos="fade-in"
            data-aos-delay="500"
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
            data-aos="fade-in"
            data-aos-delay="600"
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

        <div className="dem__graph" data-aos="fade-in" data-aos-delay="700">
          <div className="graph__container">
            <div className="graph__title">
              <p data-aos="fade-in" data-aos-delay="200">
                {getGraphData()}
              </p>
            </div>
            <div className="circular__progress--card">
              <div className="circular__progress--wrapper">
                <svg className="circular__progress--svg" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="circular__progress--bg"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="circular__progress--bar"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray="250"
                    strokeDashoffset={`${250 - (topProbability / 100) * 250}`}
                    transform="rotate(-90 50 50)"
                    cx="50"
                    cy="50"
                    r="45"
                  ></circle>
                </svg>
                <div className="circular__progress--text">
                  <p className="percentage">{topProbability.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dem__percent" data-aos="fade-in" data-aos-delay="800">
          <div
            className="confidence__label--header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{confidenceLabelDynamic}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <ul className="percent__data" style={{ listStyleType: "none" }}>
            {activeButton === "race" &&
              RaceProbabilities &&
              Object.entries(RaceProbabilities)
                .sort(([, probA], [, probB]) => probB - probA)
                .map(([race, probability]) => (
                  <li key={race}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight:
                          highlightedItem === race ? "bold" : "normal",
                        border:
                          highlightedItem === race ? "3px solid black" : "none",
                        backgroundColor:
                          highlightedItem === race ? "black" : "transparent",
                        color: highlightedItem === race ? "white" : "inherit",
                        width: "100%",
                      }}
                      onClick={() =>
                        handleConfidenceClick(race, probability, "race")
                      }
                      data-aos="fade-in"
                      data-aos-delay={`${
                        100 + Object.keys(RaceProbabilities).indexOf(race) * 100
                      }`}
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
                    </div>
                  </li>
                ))}
            {activeButton === "age" &&
              AgeProbabilities &&
              Object.entries(AgeProbabilities)
                .sort(([, probA], [, probB]) => probB - probA)
                .map(([age, probability]) => (
                  <li key={age}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: highlightedItem === age ? "bold" : "normal",
                        border:
                          highlightedItem === age ? "3px solid black" : "none",
                        backgroundColor:
                          highlightedItem === age ? "black" : "transparent",
                        color: highlightedItem === age ? "white" : "inherit",
                        width: "100%",
                      }}
                      onClick={() =>
                        handleConfidenceClick(age, probability, "age")
                      }
                      data-aos="fade-in"
                      data-aos-delay={`${
                        100 + Object.keys(AgeProbabilities).indexOf(age) * 100
                      }`}
                    >
                      <span
                        style={{
                          fontWeight:
                            highlightedItem === age ? "bold" : "normal",
                        }}
                      >
                        {age}
                      </span>
                      <span style={{ marginLeft: "20px" }}>
                        {(probability * 100).toFixed(2)}%
                      </span>
                    </div>
                  </li>
                ))}
            {activeButton === "gender" &&
              GenderProbabilities &&
              Object.entries(GenderProbabilities)
                .sort(([, probA], [, probB]) => probB - probA)
                .map(([gender, probability]) => (
                  <li key={gender}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight:
                          highlightedItem === gender ? "bold" : "normal",
                        border:
                          highlightedItem === gender
                            ? "3px solid black"
                            : "none",
                        backgroundColor:
                          highlightedItem === gender ? "black" : "transparent",
                        color: highlightedItem === gender ? "white" : "inherit",
                        width: "100%",
                      }}
                      onClick={() =>
                        handleConfidenceClick(gender, probability, "gender")
                      }
                      data-aos="fade-in"
                      data-aos-delay={`${
                        100 +
                        Object.keys(GenderProbabilities).indexOf(gender) * 100
                      }`}
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
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <div className="graph__text">
        <p data-aos="fade-in" data-aos-delay="1000">
          If A.I. estimate is wrong, select the correct one.
        </p>
      </div>
      <div
        className="navigation__bottom"
        data-aos="fade-in"
        data-aos-delay="1000"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "20px 32px",
        }}
      >
        <Back />
        <div style={{ flexGrow: 1 }}></div>
        <button className="nav__btn--reset" style={{ marginLeft: "10px" }}>
          RESET
        </button>
        <button className="nav__btn--code" style={{ marginLeft: "10px" }}>
          CONFIRM
        </button>
      </div>
    </>
  );
}

export default Demographics;
