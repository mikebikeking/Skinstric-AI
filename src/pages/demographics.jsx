import React, { useState, useEffect } from "react";
import Nav from "../components/secondNav";
import Back from "../components/back";
import Home from "../components/home";

function Demographics() {
  const [apiData, setApiData] = useState(null);
  const [AgeRange, setAgeRange] = useState(null);
  const [RaceRange, setRaceRange] = useState(null);
  const [GenderRange, setGenderRange] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("skinstricApiResponse");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setApiData(parsedData);

      if (parsedData?.data?.age) {
        const ageProbabilities = parsedData.data.age;
        let age = null;
        let highestAgeProbability = -1;
        for (const range in ageProbabilities) {
          if (ageProbabilities[range] > highestAgeProbability) {
            highestAgeProbability = ageProbabilities[range];
            age = range;
          }
        }
        setAgeRange(age);
      }

      if (parsedData?.data?.race) {
        const raceProbabilities = parsedData.data.race;
        let race = null;
        let highestRaceProbability = -1;
        for (const r in raceProbabilities) {
          if (raceProbabilities[r] > highestRaceProbability) {
            highestRaceProbability = raceProbabilities[r];
            race = r;
          }
        }
        setRaceRange(race);
      }

      if (parsedData?.data?.gender) {
        const genderProbabilities = parsedData.data.gender;
        let gender = null;
        let highestGenderProbability = -1;
        for (const g in genderProbabilities) {
          if (genderProbabilities[g] > highestGenderProbability) {
            highestGenderProbability = genderProbabilities[g];
            gender = g;
          }
        }
        setGenderRange(gender);
      }
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="dem__header">
        <h2>A.I. Analysis</h2>
        <h1>DEMOGRAPHICS</h1>
        <p>Predicted Race & Age</p>
      </div>
      <div className="dem__container">
        <div className="dem__buttons">
          <button className="dem__buttons">
            {RaceRange ? `Race: ${RaceRange}` : "Race"}
          </button>
          <button className="dem__buttons">
            {AgeRange ? `Age: ${AgeRange}` : "Age"}
          </button>
          <button className="dem__buttons">
            {GenderRange ? `Gender: ${GenderRange}` : "Gender"}
          </button>
        </div>
        <div className="dem__graph">
          <p>If A.I. estimate is wrong, select the correct one.</p>
        </div>
        <div className="dem__percent">
          {RaceRange && "RACE A.I. CONFIDENCE"}
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