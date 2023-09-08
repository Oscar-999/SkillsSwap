import React from 'react'
import "./LandingPage.css";
import { NavLink } from 'react-router-dom';
import landingOne from "./assets/images/landingOne.jpeg";
import landingTwo from "./assets/images/landingTwo.jpeg";
import landingThree from './assets/images/landingThree.jpg';
import landingFour from './assets/images/landingFour.jpg';
import landingFive from './assets/images/landingFive.jpeg';
import landingSix from './assets/images/landingSix.jpg';
import person from './assets/images/person.webp';
import Footer from '../Footer/Footer';

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
              {/* <button className="join-button">See Requests</button> */}
            </div>
          </div>

        </div>
      </div>






      <div className="freelance-third-box">

        <div className="freelance-third-innerbox">
          <div className="freelance-third-content">
            <div className="freelance-third-outerbox">

              <div className="freelance-third-innerbox">
                <div className="freelance-third-content">

                  <h2>The best part? Everything.</h2>

                  <ul className="business-solutions-list">
                    <li className="business-solution">
                      <i class="bx bx-check"></i>
                      Stick to your budget
                    </li>
                    <li className="business-solution-description">
                      Find the right service for every price point. No hourly rates, just project-based pricing.
                    </li>
                  </ul>

                  <ul className="business-solutions-list">
                    <li className="business-solution">
                      <i class="bx bx-check"></i>
                      Get quality work done quickly
                    </li>
                    <li className="business-solution-description">
                      Hand your project over to a talented freelancer in minutes, get long-lasting results.
                    </li>
                  </ul>

                </div>
              </div>


              <div className='landing-third-page-images'>
                <div className="freelancer-third-image">
                  <img src={landingFive} alt="landingFive" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>






      <div className="freelance-second-box">

        <div className="freelance-second-innerbox">
          <div className="freelance-second-content">
            <div className="freelance-second-outerbox">

              <div className="freelance-second-innerbox">
                <div className="freelance-second-content">
                  <h2>Skill Swap Business Solutions</h2>
                  <p>
                    Advanced solutions and professional talent for businesses
                  </p>
                  <h2>Skill Swap Business Solutions</h2>
                  <p>
                    Advanced solutions and professional talent for businesses
                  </p>

                  <ul className="business-solutions-list">
                    <li className="business-solution">
                      <i class="bx bx-check"></i>
                      Skill Swap Pro
                    </li>
                    <li className="business-solution-description">
                      Access top freelancers and professional business tools for any project
                    </li>
                  </ul>

                  <ul className="business-solutions-list">
                    <li className="business-solution">
                      <i class="bx bx-check"></i> Reliable Service
                      Skill Swap Certified
                    </li>
                    <li className="business-solution-description">
                      Build your own branded marketplace of certified experts
                    </li>
                  </ul>

                  <ul className="business-solutions-list">
                    <li className="business-solution">
                      <i class="bx bx-check"></i>
                      Skill Swap Enterprise
                    </li>
                    <li className="business-solution-description">
                      Manage your freelance workforce and onboard additional talent with an end-to-end SaaS solution
                    </li>
                  </ul>
                </div>
              </div>


              <div className='landing-page-images'>
                <div className="top-row">
                  <div className="freelancer-sec-image">
                    <img src={landingFour} alt="landingFour" />
                  </div>
                  <div className="request-image">
                    <img src={landingSix} alt="landing" />
                  </div>
                </div>
                <div className="bottom-row">
                  <div className="third-image">
                    <img src={landingThree} alt="landingThree" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      <div className="freelance-signup-box">
        <div className="signup-content">
          <h2>Ready to join?</h2>
          <li className="nav-item">
            <NavLink exact to="/signup" activeClassName="active-link">
              Join Skill Swap
            </NavLink>
          </li>
        </div>
      </div>



      <Footer />

    </div>
  );
};
export default LandingPage;
