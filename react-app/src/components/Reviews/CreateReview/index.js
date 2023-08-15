import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk, updateReviewThunk } from '../../../store/review';
import {useModal} from '../../../context/Modal'
const CreateReview = ({ type, formData }) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  // const user = useSelector(state => state.session.user);

  const [text, setText] = useState(formData.text);
  // const [stars, setStars] = useState(formData.description);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      text,
      // stars
    };

    if (type === "create") {
      submission.skillId= formData.skillId;
      try {
          dispatch(createReviewThunk(submission))
          closeModal()
      } catch (e) {
          console.log(e);
      }
 } else {
      submission.reviewId = formData.id;
      try {
          dispatch(updateReviewThunk(submission))
          closeModal()
      } catch (e) {
          console.log(e)
      }
 }
  };

  return (
    <div>
       <h1>{type === "create" ? "Add Review" : "Update Review"}</h1>
       {errors.length ? errors.map(e => (<p className='error'>{e}</p>)) : null}
      <form onSubmit={handleSubmit} id='review-form'>
          <label htmlFor='text'>text</label>
          {/* <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          /> */}
            <input
                    id="review-text"
                    placeholder="What would you like to say?"
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />


          {/* <label>Stars:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          /> */}

<button   type="submit">{type === "create" ? "Create Review" : "Update Review"}</button>
      </form>
    </div>
  );
};

export default CreateReview
