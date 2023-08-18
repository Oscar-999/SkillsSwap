import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Sign from "./assests/images/signupimage.svg"

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!username.length) newErrors.push("Must include username");
    if (!password.length) newErrors.push("Must include password");
    if (!email.length || !email.includes("@")) newErrors.push("Must include a valid email");
    if (username.length < 4 || 15 < username.length) newErrors.push("Username must be between 4 and 15 characters.");
    if (password !== confirmPassword) newErrors.push("Passwords must match");
    if (password.length < 8 || 20 < password.length) newErrors.push("Password must be between 8 and 20 characters");
    if (!profilePic || !profilePic.name) newErrors.push("Profile picture is required");
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    if (!allowedExtensions.some(ext => profilePic.name.toLowerCase().endsWith(ext))) {
      newErrors.push("Profile picture must be in JPG, JPEG, or PNG format.");
    }
    if (profilePic && profilePic.name && profilePic.name.length > 255) {
      newErrors.push("Max URL length exceeded (must be less than 255 characters)");
    }

    if (!newErrors.length) {
      const form = new FormData();
      form.append("email", email);
      form.append("username", username);
      form.append("password", password);
      form.append("profile_picture", profilePic);

      const data = await dispatch(signUp(form));
      if (data) {
        setErrors(data);
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="signup-form-container">
      <div>
      <div className="sign-upimage-container">
        <img src={Sign} alt="SignUpImage" className="signup-image" />
      </div>
        <div>
          <div>
            <h2>Create an account</h2>
            <form className="" encType="multipart/form-data" onSubmit={handleSubmit}>
              <ul className="error-list">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <label>
                <h5>Email <i style={{ color: 'red' }}>*</i></h5>
                <input
                  className="input-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                <h5>Username <i style={{ color: 'red' }}>*</i></h5>
                <input
                  className="input-field"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                <h5>Profile Picture <i style={{ color: 'red' }}>*</i></h5>
                <input
                  className="input-field"
                  type="file"
                  required
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  accept="image/*"
                />
              </label>
              <label>
                <h5>Password <i style={{ color: 'red' }}>*</i></h5>
                <input
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                <h5>Confirm Password <i style={{ color: 'red' }}>*</i></h5>
                <input
                  className="input-field"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="submit-button">
                Sign Up
              </button>
              <div className="signin-link">
                <Link to="/login">Already have an account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
