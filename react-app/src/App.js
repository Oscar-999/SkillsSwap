import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from './components/auth/ProtectedRoute'
import Explore from "./components/Skills/Explore/Explore";
import LandingPage from "./components/LandingPage/LandingPage";
import SingleSkill from "./components/Skills/IndiviudalSkill/IndivudalSkill";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import SignupFormPage from "./components/SignupFormPage";
import DarkMode from "./components/DarkMode/DarkMode";
import AccountPage from "./components/AccountPage/AccountPage";
// import ExploreRequest from "./components/Request/Explore/ExploreRequest";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <DarkMode/>
      {isLoaded && (
        <Switch>
          <Route  exact path="/" component={LandingPage}/>
          <Route path="/login" component={LoginFormPage}/>
          <Route path="/signup" component={SignupFormPage}/>
          <ProtectedRoute exact path="/skills" component={Explore}/>
          <ProtectedRoute exact path="/skills/:skillId" component={SingleSkill}/>
          <ProtectedRoute exact path="/account" component={AccountPage} />
          {/* <ProtectedRoute exact path="/requests" component={ExploreRequest}/> */}
          <Route path="*" component={ErrorPage}/>
        </Switch>
      )}
    </>
  );
}

export default App;
