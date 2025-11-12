import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import buttonIcon from "../assets/button-icon-shrunk.png";
import buttonIconFlip from "../assets/button-icon-shrunk-flip.png";
import Nav from "../components/nav";
import AOS from "aos";
import "aos/dist/aos.css";

function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 800,

      once: true,
    });
  }, []);

  return (
    <>
      <Nav />
      <div className="landing" data-aos="fade-up">
        <div className="rectangle__left">
          <div data-aos="fade-up" data-aos-delay="100">
            <Link to="#" className="lan__btn">
              <span>
                <img src={buttonIcon} className="btn__icon" alt="Discover AI" />
                Discover A.I.
              </span>
            </Link>
          </div>
        </div>
        <h1 className="title" data-aos="fade-up" data-aos-delay="200">
          Sophisticated
          <br /> skincare
        </h1>
        <Link
          to="/analysis"
          className="small__button"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Get Started
        </Link>
        <div className="rectangle__right">
          <div data-aos="fade-up" data-aos-delay="300">
            <Link to="/analysis" className="lan__btn">
              <span>
                Take Test
                <img
                  src={buttonIconFlip}
                  className="btn__icon"
                  alt="Take Test"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <p className="landing__text">
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>
    </>
  );
}

export default Landing;
