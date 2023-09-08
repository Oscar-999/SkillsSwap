import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserSkillsThunk } from "../../store/skill";
import { fetchAllUserReviewsThunk } from "../../store/review";
// import { fetchAllUserRequestsThunk } from "../../store/srequest";
import OpenModalButton from "../OpenModalButton";
import DeleteMulti from "../Skills/Manager/Delete/Delete";
import UpdateReviewModal from "../Reviews/Update/UpdateReview";
import SkillManger from "../Skills/Manager";
import Footer from "../Footer/Footer";
import { logout } from "../../store/session";

import { Link } from "react-router-dom";

import "./AccountPage.css";

const AccountPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    console.log('this is the user', user)
    const allSkills = useSelector((state) => state.skills.allSkills);
    const userReviews = useSelector((state) => state.reviews.user.reviews);
    const userRequests = useSelector((state) => state.requests.user.requests);

    const userSkills = Object.values(allSkills).filter(
        (skill) => skill.ownerId === user.id
    );

    const userId = user.id;

    useEffect(() => {
        dispatch(loadUserSkillsThunk(user.id));
        dispatch(fetchAllUserReviewsThunk());
        // dispatch(fetchAllUserRequestsThunk(user.id));
    }, [dispatch, user.id]);


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
      };


    return (
        <>
        <div className="account-page-container">
            <h2>Welcome to Your Account Page, @{user.username}!</h2>

            <div className="user-info-section">
                <h3 className="section-title">User Information</h3>
                <div className="profile-picture-container">
                    {/* <p className="info-label">Profile Picture:</p> */}
                    <img className="profile-picture" src={user.profilePic} alt="Profile" />
                </div>
                    <p>{user.username}</p>
                <p className="info-item">Email: {user.email}</p>
            </div>


            <div className="user-skills-container">
                <h3>Your Skills:</h3>
                {userSkills.length === 0 ? (
                    <p>You have not added any skills yet.</p>
                ) : (
                    <ul className="user-skills-list">
                        {userSkills.map((skill) => (
                            <li key={skill.id} className="user-skill-item">
                                <Link to={`/skills/${skill.id}`} className="user-skill-link">
                                    <div className="user-skill-image">
                                        <img src={skill.skillImage} alt={skill.name} />
                                    </div>
                                    <div className="user-skill-details">
                                        <p className="user-skill-name">{skill.name}</p>
                                        <p className="user-skill-description">{skill.description}</p>
                                        <p className="user-skill-price">Price: ${skill.price}</p>
                                    </div>
                                </Link>
                                <OpenModalButton
                                    modalComponent={<SkillManger skill={skill} />}
                                    buttonText="&#x2699; Settings"
                                    className={"server-emoji-button"}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>



            <div className="user-reviews-container">
                <h3>Your Reviews:</h3>
                {userReviews.length === 0 ? (
                    <p>You have not submitted any reviews yet.</p>
                ) : (
                    <ul className="user-reviews-list">
                        {userReviews.map((review) => (
                            <li key={review.id} className="user-review-item">
                                <p className="user-review-text">{review.text}</p>
                                <div className="manage-buttons-container">
                                    <OpenModalButton
                                        modalComponent={<UpdateReviewModal review={review} />}
                                        buttonText="Update Review"
                                        id="update-review"
                                    />
                                    <OpenModalButton
                                        modalComponent={
                                            <DeleteMulti type={"review"} id={review.id} />
                                        }
                                        buttonText="Delete Review"
                                        id="delete-review"
                                    />
                                </div>
                            </li>

                        ))}
                    </ul>
                )}
            </div>


            <div className="user-request-container">
                <h3>Your Requests:</h3>
                <div className="user-request-list">
                    {userRequests.length === 0 ? (
                        <p>No requests available.</p>
                    ) : (
                        userRequests.map((request) => (
                            <div key={request.id} className="user-request-item">
                                <p>Name: {request.name}</p>
                                <p>Description: {request.description}</p>
                                <p>Budget: {request.budget}</p>
                                {request.userId === userId && (
                                    <div className="manage-buttons-container">
                                        <OpenModalButton
                                            modalComponent={<DeleteMulti type={"request"} id={request.id} />}
                                            buttonText="Delete Request"
                                            id="delete-request"
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>



            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>

        </div>
            <Footer />
            </>

    );
};

export default AccountPage;
