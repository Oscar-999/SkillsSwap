import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import freelanceImage from "./assets/images/freelancedesk.png"
import { useModal } from "../../context/Modal";


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  function LoginDemoUser() {
    const demoUserInfo = {
      email: 'demo1@aa.io',
      password: 'password'
    }

    return dispatch(login(demoUserInfo.email, demoUserInfo.password))
      .then(closeModal);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
          <div className="demo-login">
            <button type='submit' onClick={LoginDemoUser}>Demo User</button>
          </div>
        </form>
      </div>
      <div className="image-container">
        <img src={freelanceImage} alt="Freelance" className="freelance-image" />
      </div>
    </div>
  );
}

export default LoginFormPage;
