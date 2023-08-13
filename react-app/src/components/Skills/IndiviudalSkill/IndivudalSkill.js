import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleSkillThunk } from '../../../store/skill';
import { fetchReviews } from '../../../store/review';
import './IndivudalSkill.css';

import OpenModalButton from '../../OpenModalButton';
import SkillManger from '../Manager';

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

  if (!skill) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="friendsz">
        <h1 className="server-name">
          {skill.name}
          {isOwner ? " " : null}
          {isOwner ? (
            <OpenModalButton
              modalComponent={<SkillManger skill={skill} />}
              buttonText="&#x2699;"
              className={"server-emoji-button"}
            />
          ) : null}
        </h1>
        <img
          className="singleimgban"
          src={skill.skillImage}
          alt="Banner Image"
        />
        <img
          className="singleimg"
          src={skill.secondaryImage}
          alt="Server Image"
        />
        <p className="server-name">{skill.description}</p>
      </div>

      <div className="reviews-container">
        <h2>Reviews:</h2>
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <p>{review.reviewText}</p>
            <p>Reviewer ID: {review.reviewerId}</p>
            <p>Created At: {review.createdAt}</p>
            {/* Display other review properties */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleSkill;
