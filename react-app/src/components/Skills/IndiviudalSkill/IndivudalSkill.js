import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleSkillThunk } from '../../../store/skill';
import './IndivudalSkill.css'

import OpenModalButton from '../../OpenModalButton';
const SingleSkill = () => {
  const { skillId } = useParams();
  const dispatch = useDispatch();
  const skill = useSelector(state => state.skills.singleSkill); // Change variable name to 'skill'

  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(loadSingleSkillThunk(skillId));
  }, [dispatch, skillId]);

  if (!skill) { // Change variable name here
    return <div>Loading...</div>;
  }

  return (
    <div className="single-skill">
      <h2>{skill.name}</h2> {/* Change variable name here */}
      <p>{skill.description}</p> {/* Change variable name here */}
    </div>
  );
};

export default SingleSkill;
