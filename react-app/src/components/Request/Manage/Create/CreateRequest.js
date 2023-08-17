import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { createRequestThunk } from "../../../../store/srequest";
import './CreateRequest.css'

const CreateRequest = ({ type, formData }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState(formData.name);
  const [description, setDescription] = useState(formData.description);
  const [budget, setBudget] = useState(formData.budget);
  // const [image, setImage] = useState(formData.image);
  const [errors, setErrors] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // const newErrors = [];

    if (name.trim() === '') {
      setErrors(['Name cannot be empty.']);
      return; // Don't proceed with submission
    } else if (name.length < 8) {
      setErrors(['Name must be at least 8 characters long.']);
      return; // Don't proceed with submission
    } else if (name.length > 100) {
      setErrors(['Name cannot exceed 50 characters.']);
      return; // Don't proceed with submission
    }
    // if (newErrors.length) {
    //   setErrors(newErrors);
    //   setDisableButton(true);
    //   return;
    // }

    if (description.trim().split(' ').length < 3) {
      setErrors(['Description must contain at least 3 words.']);
      return;
    }

    if (budget < 20) {
      setErrors(['Budget must be at least $20.']);
      return;
    }

    const submission = {
      name,
      description,
      budget,
      // image,
    };

if (type === 'create') {
  submission.skillId = formData.skillId
    try {
      await dispatch(createRequestThunk(submission)); // Dispatching your thunk
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };
}
  // useEffect(() => {
  //   setDisableButton(false);
  //   const newErrors = [];
  //   if (!name.trim() || name.length < 3 || name.length > 100)
  //     newErrors.push("Invalid request name.");
  //   if (!description.trim()) newErrors.push("Description cannot be empty.");
  //   if (!budget) newErrors.push("Budget cannot be empty.");
  //   if (!image) newErrors.push("Please select an image.");

  //   if (newErrors.length) setDisableButton(true);
  // }, [name, description, budget, image]);

  return (
    <div className='overall-request'>
      <div className="create-request">
        <h1>{type === "create" ? "Create a Request" : "Update Request"}</h1>
        {errors.length ? errors.map((e, index) => (<p key={index} className='error'>{e}</p>)) : null}
        <form onSubmit={handleSubmit} id="request-form" encType="multipart/form-data">
        <label id='create-label' htmlFor="request-name">Name:</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your request"
        />
            <label id='create-label' htmlFor="request-description">Description:</label>
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your request"
        />
        {submitted && description.trim().split(' ').length < 10 && (
          <p className="error">Description must contain at least 10 words.</p>
        )}

        <label id='create-label' htmlFor="budget">Budget:</label>
        <input
          type="number"
          value={budget}
          required
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Set your budget"
        />
        {submitted && budget < 20 && (
          <p className="error">Budget must be at least $20.</p>
        )}

        <button
          type="submit"
          className={type === "create" ? "create-request-button" : "update-request-button"}
        >
          {type === "create" ? "Create Request" : "Update Request"}
        </button>
      </form>
    </div>
  </div>
);
};

export default CreateRequest;
