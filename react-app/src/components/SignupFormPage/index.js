import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// function isValidImage(fileName) {
//   const validEndings = ['.jpg', '.jpeg', '.png'];
//   for (const ending of validEndings) if (fileName.endsWith(ending)) return true;

//   return false;
// };

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
    console.log({
      "username": username,
      "password": password,
      "email": email,
      "profilePic": profilePic,
      "confirmPassword": confirmPassword,
      "errors": errors
    })

    if (!username.length) newErrors.push("Must include username");
    if (!password.length) newErrors.push("Must include password");
    if (!email.length || !email.includes("@")) newErrors.push("Must include a valid email");
    if (username.length < 1 || 40 < username.length) newErrors.push("Username must be between 1 and 40 characters.");
    if (password !== confirmPassword) newErrors.push("Passwords must match");
    if (password.length < 1 || 255 < password.length) newErrors.push("Password must be between 1 and 255 characters");
    if (profilePic.length > 255) newErrors.push("Max URL length exceeded (must be less than 255 characters)");

    if (!newErrors.length) {
      const form = new FormData();
      form.append("email", email);
      form.append("username", username);
      form.append("password", password);
      form.append("profile_picture", profilePic);

      console.log(form);
      const data = await dispatch(signUp(form));
      if (data) {
        setErrors(data);
      }
    };

    setErrors(newErrors);
  };

  return (
    <div >
    <div >
      <div >
        <div >
          <h2>Create an account</h2>
          <form className='' encType='multipart/form-data' onSubmit={handleSubmit}>
          <ul className=''>
{errors.map((error, idx) => (
  <li className="" key={idx}>{error}</li>
))}
</ul>

            <label>
              <h5>
                Email <i style={{ color: 'red' }}>*</i>
              </h5>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <h5>Username  <i style={{ color: 'red' }}>*</i></h5>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              <h5>ProfilePicture  <i style={{ color: 'red' }}>*</i></h5>
              <input
                type="file"
                required
                onChange={(e) => setProfilePic(e.target.files[0])}
                accept="image/*"
              />
            </label>
            <label>
              <h5>Password  <i style={{ color: 'red' }}>*</i></h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <h5>Confirm Password  <i style={{ color: 'red' }}>*</i></h5>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className=''>
              Sign Up
            </button>
            <Link to="/login" className="sing">
              Already have an account
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default SignupFormPage;
