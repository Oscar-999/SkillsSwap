import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk } from '../../../store/review'; // Make sure to import the correct action

const CreateReview = ({ skillId, closeModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [reviewText, setReviewText] = useState('');
  const [stars, setStars] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText || !stars) {
      setError('Both review text and stars are required.');
      return;
    }

    const reviewData = {
      reviewText,
      stars: parseInt(stars),
      skillId,
      userId: user.id
    };

    const result = await dispatch(createReviewThunk(reviewData));

    if (result && result.error) {
      setError('An error occurred while creating the review.');
    } else {
      // Reset the form fields
      setReviewText('');
      setStars('');
      setError('');
      closeModal(); // Close the modal after successful submission
    }
  };

  return (
    <div>
      <h2>Create Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Review Text:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div>
          <label>Stars:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;
