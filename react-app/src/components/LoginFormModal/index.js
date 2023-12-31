import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import panelImage from "./assets/images/freelance.avif"
// import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
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
    <div className="login-form">
      <div className="image-container">
        <img src={panelImage} alt="" className="panel-image" />
      </div>
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
        </form>
        <div className="demo-login">
          <button type='submit' onClick={LoginDemoUser}>Demo User</button>
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
