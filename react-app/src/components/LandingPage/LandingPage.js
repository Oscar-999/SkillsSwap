import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="App">
      <div className="freelance-box">
        <div className="freelance-innerbox">
          <div className="freelance-content">
            <h2>Hire Licensed Professionals</h2>
            <p>
              Our platform connects you with licensed experts ready to complete
              any task you need assistance with. Whether it's fixing, building,
              or creating, our network of professionals is here to deliver
              quality services. Say goodbye to the hassle of searching.
            </p>
            <button className="find-button">Hire Now</button>
          </div>
          <div className="freelancer-image">
            <img src="" alt="" />
            IMAGE
          </div>
        </div>
      </div>

      <div className="request-box">
        <div className="request-innerbox">
          <div className="request-image">
            <img src="" alt="" />
            IMAGE
          </div>
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
  );
};
export default LandingPage;
