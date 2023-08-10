import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleSkillThunk } from '../../../store/skill';

const SingleSkill = () => {
  const { skillId } = useParams();
  const dispatch = useDispatch();
  const singleSkill = useSelector(state => state.skills.singleSkill);

  useEffect(() => {
    dispatch(loadSingleSkillThunk(skillId));
  }, [dispatch, skillId]);

  if (!singleSkill) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-skill">
      <h2>{singleSkill.name}</h2>
      <p>{singleSkill.description}</p>

    </div>
  );
};

export default SingleSkill;
