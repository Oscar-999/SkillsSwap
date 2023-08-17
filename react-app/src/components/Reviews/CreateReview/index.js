import React, { useState } from 'react';
import { useDispatch,  } from 'react-redux';
import { createReviewThunk, updateReviewThunk } from '../../../store/review';
import { useModal } from '../../../context/Modal';
import "./CreateReview.css"


const CreateReview = ({ type, formData }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [text, setText] = useState(formData.text);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (text.trim() === '') {
      setErrors(['Review cannot be empty.']);
      return; // Don't proceed with submission
    } else if (text.length < 3) {
      setErrors(['Review must be at least 3 characters long.']);
      return; // Don't proceed with submission
    } else if (text.length > 100) {
      setErrors(['Review cannot exceed 100 characters.']);
      return; // Don't proceed with submission
    }

    const submission = {
      text,
    };

    if (type === "create") {
      submission.skillId = formData.skillId;
      try {
        dispatch(createReviewThunk(submission));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    } else {
      submission.reviewId = formData.id;
      try {
        dispatch(updateReviewThunk(submission));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className='create-review'>
      <h1>{type === "create" ? "Add Review" : "Update Review"}</h1>
      {errors.length ? errors.map((e, index) => (<p key={index} className='error'>{e}</p>)) : null}
      <form onSubmit={handleSubmit} id='review-form'>
        <label id="create-label" htmlFor='text'>Text:</label>
        <textarea
          id='review-text'
          placeholder='What would you like to say?'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type='submit'
          className={type === 'create' ? 'create-review-button' : 'update-review-button'}
        >
          {type === "create" ? "Create Review" : "Update Review"}
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
