import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from './components/auth/ProtectedRoute'
import Explore from "./components/Skills/Explore/Explore";
import LandingPage from "./components/LandingPage/LandingPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" component={LandingPage}/>
          <ProtectedRoute path="/skills" component={Explore}/>

        </Switch>
      )}
    </>
  );
}

export default App;

          // <Route path="/signup">
          //   <SignupFormPage />
          // </Route>
{/* <Route path="/login" >
  <LoginFormPage />
</Route> */}
