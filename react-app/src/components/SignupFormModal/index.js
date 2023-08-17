import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultProfilePic = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
    const [profilePic, setProfilePic] = useState(null);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const validateEmail = (email) => {
        return email.includes('@') && email.includes('.');
    };

    const validatePassword = (password) => {
        return password.length > 7 && password.length <= 20;
    };

    const validateUserName = (username) => {
        return username.length > 3 && username.length <= 15;
    }

    const validateProfilePicUrl = (url) => {
        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        const isValidExtension = allowedExtensions.some(ext => url.toLowerCase().endsWith(ext));
        return isValidExtension;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!validateEmail(email)) {
            newErrors.push("Email must include '@' and '.' .");
        }

        if (!validatePassword(password)) {
            newErrors.push("Password must be between 8 and 20 characters.");
        }

        if (!validateUserName(username)) {
            newErrors.push("Username must be between 4 and 15 characters.")
        }

        if (password !== confirmPassword) {
            newErrors.push("Confirm Password field must match the Password field.");
        }

        if (!validateProfilePicUrl(profilePic?.name || "")) {
            newErrors.push("Profile picture must be in JPG, JPEG, or PNG format.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        setProfilePic(profilePic || defaultProfilePic);

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile_picture", profilePic);

        const data = await dispatch(signUp(formData));
        if (data) {
            setErrors(data);
        } else {
            closeModal();
        }
    };

    return (
        <>
            <div className="signup-form">
                <h1>Sign Up</h1>
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
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Profile Picture
                        <input
                            type="file"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                            accept="image/*"
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
