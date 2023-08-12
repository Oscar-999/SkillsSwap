import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleSkillThunk } from '../../../store/skill';
import './IndivudalSkill.css'

import OpenModalButton from '../../OpenModalButton';
import SkillManger from '../Manager';
const SingleSkill = () => {
  const { skillId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleSkillThunk(skillId));
  }, [dispatch, skillId]);

  const skill = useSelector(state => state.skills.singleSkill); // Change variable name to 'skill'
  const user = useSelector((state) => state.session.user);

  const userId = user.id;
  const isOwner = userId === skill.ownerId;
  
    console.log("userId:", userId);
    console.log("skill.ownerId:", skill.ownerId);
    console.log("isOwner:", isOwner);
  if (!skill) { // Change variable name here
    return <div>Loading...</div>;
  }

  return (
    <div>
      {skill ? (
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
      ) : (
        <p>Loading server information...</p>
      )}
    </div>
  );
      }

export default SingleSkill;
