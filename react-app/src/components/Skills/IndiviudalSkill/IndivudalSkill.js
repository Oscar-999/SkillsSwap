import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleSkillThunk } from '../../../store/skill';
import { fetchReviews } from '../../../store/review';
import './IndivudalSkill.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import OpenModalButton from '../../OpenModalButton';
import SkillManger from '../Manager';
import CreateReview from '../../Reviews/CreateReview'; // Import CreateReview component
import CreateReviewModal from '../../Reviews/CreateReview/ModalCreateReview';

const defaultImage = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"

const SingleSkill = () => {
  const { skillId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleSkillThunk(skillId));
    dispatch(fetchReviews(skillId)); // Fetch reviews
  }, [dispatch, skillId]);

  const skill = useSelector(state => state.skills.singleSkill);
  const user = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews.skill.reviews); // Access nested reviews

  const userId = user.id;
  const isOwner = userId === skill.ownerId;

  const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false);

  return (
    <div>
      {!skill ? (
        <div>Loading...</div>
      ) : (
        <div className="friendsz">
          <h1 className="server-name">
            {skill.name}
            {isOwner && (
              <OpenModalButton
                modalComponent={<SkillManger skill={skill} />}
                buttonText="&#x2699;"
                className={"server-emoji-button"}
              />
            )}
          </h1>
          <Carousel className="Carousel-images" renderThubmbs={() => null}>
            <div>
              <img
                className="singleimgban"
                src={skill.skillImage || defaultImage}
                alt="Banner "
              />
            </div>
            <div>
              <img
                className="singleimg"
                src={skill.secondaryImage || defaultImage}
                alt="Server "
              />
            </div>
            <div>
              <img
                className="singleimg"
                src={skill.thirdImage || defaultImage}
                alt="Server "
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
              {/* Display other review properties */}
            </div>
          ))
        )}

        {/* Render CreateReview component as a modal */}
        {isCreateReviewModalOpen && (
          <CreateReview type="create" formData={{ text: "", skillId }} closeModal={() => setIsCreateReviewModalOpen(false)} />
        )}


<OpenModalButton  buttonText="Create Review" modalComponent={<CreateReviewModal skillId={skill.id} />} />
      </div>
    </div>
  );
};

export default SingleSkill;
