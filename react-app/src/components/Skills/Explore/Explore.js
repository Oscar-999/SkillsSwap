import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSkillsThunk } from "../../../store/skill";
import { Link } from "react-router-dom";
import "./Explore.css";
import OpenModalButton from "../../OpenModalButton";
import CreateSkillModal from "../Manager/Create/CreateSkillModal";
const Explore = () => {
  const dispatch = useDispatch();
  const skillsObj = useSelector((state) => state.skills.allSkills);
  const skillsList = Object.values(skillsObj);

  useEffect(() => {
    dispatch(loadAllSkillsThunk());
  }, [dispatch]);

  if (!skillsList) {
    return null;
  }

  return (
    <main>
      <div className="explore-welcome">
        <h1>Skills for Hire</h1>
      </div>

      <ul className="skill-list">
      <li className="squircle green-boi">
            {/* <svg
              className="circleIcon-LvPL6c"
              aria-hidden="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
              ></path>
            </svg> */}
            <OpenModalButton
              modalComponent={<CreateSkillModal title="Create Skill" />}
              buttonText="&#43;"
              className="open-create-server"
            />
            <div className="popper-boi">
              <h4 className="popper-text">Add Server</h4>
            </div>
          </li>
        {skillsList.length > 0 &&
          skillsList.map((skill) => (
            <div key={skill.id} className="skill" title={skill.name}>
              <Link to={`/skills/${skill.id}`}>
                <div className="image">
                  <img src={skill.skillImage} alt="skill" />
                </div>
                <div className="details">

                  <li className="skill-name">{skill.name}</li>
                  <li className="skill-description">{skill.description}</li>
                  <li className="skill-price">Price: ${skill.price}</li>
                </div>


              </Link>
            </div>
          ))}
      </ul>
    </main>
  );
};

export default Explore;
