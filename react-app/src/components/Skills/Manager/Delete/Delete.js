import React from 'react';
import { useModal } from '../../../../context/Modal';
import { deleteSkillThunk } from '../../../../store/skill';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Delete.css';
import { deleteReviewThunk } from '../../../../store/review';

const DeleteMulti = ({ type, id }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");



  const deleter = () => {
    try {
      if (type === "skill") {
        dispatch(deleteSkillThunk(id)).then(() => history.push("/skills"));
      }
      if (type === 'review') {
        dispatch(deleteReviewThunk(id))
      }
      return closeModal();
    } catch (e) {
      return setErrorMessage("There was a problem. Please refresh");
    }
  }



  const deleteContainerClass = type === 'skill' ? 'skill-delete-container' : 'review-delete-container';
  const deletionButtonClassName = 'deletion-button';

  return (
    <div className={`delete-wrapper ${deleteContainerClass}`}>
      <h2 className="delete-head">Are you sure you want to delete this {type === "skill" ? "skill" : "review"}</h2>
      <h2 className='warning'>This won't be undone</h2>
      <p className='errors'>{errorMessage}</p>
      <div>
        <button onClick={deleter} className={deletionButtonClassName}>Delete it</button>
        <button onClick={closeModal} className='cancelbttn'>No cancel</button>
      </div>    </div>
  );
};

export default DeleteMulti;
