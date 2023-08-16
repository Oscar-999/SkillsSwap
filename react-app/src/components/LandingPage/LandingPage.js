import React from 'react'
import "./LandingPage.css";
import { NavLink } from 'react-router-dom';
import landingOne from "./assets/images/landingOne.jpeg";
import landingTwo from "./assets/images/landingTwo.jpeg";

const LandingPage = () => {
  return (
    <div className="App">
      <div className="freelance-box">
        <div className="freelance-outerbox">

          <div className="freelance-innerbox">
            <div className="freelance-content">
              <h2>Hire Licensed Professionals</h2>
              <p>
                Our platform connects you with licensed experts ready to complete
                any task you need assistance with. Whether it's fixing, building,
                or creating, our network of professionals is here to deliver
                quality services. Say goodbye to the hassle of searching.
              </p>

              <NavLink to="/skills" className="find-button">Hire Now</NavLink>
            </div>
          </div>
          <div className="freelancer-image">
            <img src={landingOne} alt="landingOne" />
          </div>
        </div>
      </div>

      <div className="request-box">
        <div className="request-outerbox">

          <div className="request-image">
            <img src={landingTwo} alt="landingTwo" />
          </div>

          <div className="request-innerbox">
            <div className="request-content">
              <h2>Ready to pick up on Projects?</h2>
              <p>
                Need to enhance your skill set and earn an income? Look no
                further! There are various requests waiting to be fulfilled,
                offering you an opportunity to showcase your expertise and get
                rewarded for your efforts.
              </p>
              <button className="join-button">See Requests</button>
            </div>
          </div>

        </div>
      </div>

      <footer className="Footer">
        <h2>Skill Swap</h2>
        <p>Copyright &copy; 2023 Oscar Alcantar. All rights reserved.</p>
        <div className="footer-grid">
          <a href="https://github.com/Oscar-999">Github
            <i className="bx bxl-github bx-flashing"></i>
          </a>
          {/* <p> | </p> */}
          <a href="https://www.linkedin.com/in/oscar-alcantar-800313204/">Linkedin
            <i class='bx bxl-linkedin-square'></i>
          </a>
        </div>

      </footer>

    </div>
  );
};
export default LandingPage;
