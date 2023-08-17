import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleSkillThunk } from "../../../store/skill";
import { fetchReviews } from "../../../store/review";
import "./IndivudalSkill.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UpdateReviewModal from "../../Reviews/Update/UpdateReview";
import DeleteMulti from "../Manager/Delete/Delete";
import OpenModalButton from "../../OpenModalButton";
import SkillManger from "../Manager";
import CreateReviewModal from "../../Reviews/CreateReview/ModalCreateReview";

const defaultImage =
  "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";

const SingleSkill = () => {
  const { skillId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleSkillThunk(skillId));
    dispatch(fetchReviews(skillId)); // Fetch reviews
  }, [dispatch, skillId]);

  const skill = useSelector((state) => state.skills.singleSkill);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.skill.reviews);

  const userId = user.id;
  const isOwner = userId === skill.ownerId;

  // const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false);

  const userReviews = reviews.filter((review) => review.reviewerId === userId);

  const [activeTab, setActiveTab] = useState("Basic");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // const openCreateReviewModal = () => {
  //   setIsCreateReviewModalOpen(true);
  // };

  return (
    <>
      <div className="individiual-skill-container">
        <div className="left-skill-container">
          {!skill ? (
            <div>Loading...</div>
          ) : (
            <div className="friendsz">
              <h1 className="server-name">
                {skill.name}
                {isOwner && (
                  <OpenModalButton
                    modalComponent={<SkillManger skill={skill} />}
                    buttonText="&#x2699; Settings"
                    className={"server-emoji-button"}
                  />
                )}
              </h1>
              <Carousel className="Carousel-images" renderThubmbs={() => null}>
                <div>
                  <img
                    className="singleimgban"
                    src={skill.skillImage || defaultImage}
                    alt="Banner"
                  />
                </div>
                <div>
                  <img
                    className="singleimg"
                    src={skill.secondaryImage || defaultImage}
                    alt="Server"
                  />
                </div>
                <div>
                  <img
                    className="singleimg"
                    src={skill.thirdImage || defaultImage}
                    alt="Server"
                  />
                </div>
              </Carousel>
              <p className="server-name">{skill.description}</p>
            </div>
          )}

          <div className="reviews-container">
            <h2>Reviews:</h2>
            {reviews.length === 0 ? (
              <p>No reviews available.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <p>{review.text}</p>
                  <p>Reviewer ID: {review.reviewerId}</p>
                  <p>Created At: {review.createdAt}</p>

                  {/* Render "Update Review" and "Delete Review" buttons for the owner of the review */}
                  {review.reviewerId === userId && (
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
                  )}
                </div>
              ))
            )}

            {/* Render "Write a Review" button and modal */}
            {isOwner ? (
              <p>You can't review your own skill.</p>
            ) : userReviews.length === 0 ? (
              <>
                <OpenModalButton
                  modalComponent={
                    <CreateReviewModal skillId={skill.id}></CreateReviewModal>
                  }
                  buttonText="Review This skill"
                  id="skill-review"
                />
                {/* <button onClick={openCreateReviewModal}>Write a Review</button>
      <CreateReviewModal
        skillId={skill.id}
        closeModal={() => setIsCreateReviewModalOpen(false)}
      /> */}
              </>
            ) : (
              <p>You've already reviewed this skill.</p>
            )}
          </div>
        </div>

        <div className="right-side-container">
          <div className="box-details">
            <div className="plans">
              <h3
                className={`tab ${activeTab === "Basic" ? "active-tab" : ""}`}
                onClick={() => handleTabClick("Basic")}
              >
                Basic
              </h3>
              <h3
                className={`tab ${
                  activeTab === "Standard" ? "active-tab" : ""
                }`}
                onClick={() => handleTabClick("Standard")}
              >
                Standard
              </h3>
              <h3
                className={`tab ${activeTab === "Premium" ? "active-tab" : ""}`}
                onClick={() => handleTabClick("Premium")}
              >
                Premium
              </h3>
            </div>

            <div className="box-price">
              <div className="price-section">
                <h3>Price</h3>
                <p>${skill.price}</p>
              </div>
              <div className="right-description">
                <p>{skill.description}</p>
              </div>
              <div className="skill-type">
                <p>
                  Quality Results <i class="bx bx-trophy"></i>
                </p>
                <p>
                  Timely Delivery <i class="bx bxs-time"></i>
                </p>
              </div>
              <div className="skill-texts">
                <p>
                  <i class="bx bx-check"></i> Professional Expertise
                </p>
                <p>
                  <i class="bx bx-check"></i> Reliable Service
                </p>
                <p>
                  <i class="bx bx-check"></i> Dedicated Support
                </p>
                <p>
                  <i class="bx bx-check"></i> Creative Approach
                </p>
              </div>
              {/* <OpenModalButton
                        modalComponent={<DeleteMulti type={"review"} id={review.id} />}
                        buttonText="Delete Review"
                        id="delete-review"
                      /> */}
              REQUEST-BUTTON
            </div>

            <div className="request-channel">Request Channel</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSkill;
