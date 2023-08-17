import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRequestThunk } from '../../../../store/srequest';
import { useModal } from '../../../../context/Modal';

const CreateRequest = ({ type, formData }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

    const [name, setName] = useState(formData.name)
    const [description, setDescription] = useState(formData.description);
    const [budget, setBudget] = useState(formData.budget)
    const [reqImage, setReqImage] = useState(formData.reqImage)
    const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (name.trim() === '') {
      setErrors(['Request cannot be empty.']);
      return; // Don't proceed with submission
    } else if (name.length < 3) {
      setErrors(['Request must be at least 3 characters long.']);
      return; // Don't proceed with submission
    } else if (name.length > 100) {
      setErrors(['Request cannot exceed 100 characters.']);
      return; // Don't proceed with submission
    }

    const submission = {
        name,
        description,
        budget,
        reqImage
      };

    if (type === "create") {
      submission.skillId = formData.skillId;
      try {
        dispatch(createRequestThunk(submission));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
    // } else {
    //   submission.reviewId = formData.id;
    //   try {
    //     dispatch(updateReviewThunk(submission));
    //     closeModal();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  };

  return (
    <div>
      <h1>{type === "create" ? "Add Request" : "Update Request"}</h1>
      {errors.length ? errors.map((e, index) => (<p key={index} className='error'>{e}</p>)) : null}
      <form onSubmit={handleSubmit} id='request-form' encType="multipart/form-data">
        <label htmlFor='name'>Name:</label>
        <input
          type="text"
          id='request-name'
          required
          placeholder='Name your request'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='request-description'>Description:</label>
        <input
          type="text"
          id='request-description'
          required
          placeholder='Describe your request'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor='budget'>Budget:</label>
        <input
        type='number'
          id='budget'
          placeholder='What would you like to say?'
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <label htmlFor='req-image'>ReqImage:</label>
        <input
        type='file'
        name='request-image'
        id='req-image'
        value={reqImage}
        onChange={(e) => setReqImage(e.target.files[0])}
        accept="image/*"
        />

        <button type='submit'>
          {type === "create" ? "Create Request" : "Update Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
