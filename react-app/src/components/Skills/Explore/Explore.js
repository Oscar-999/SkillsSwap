import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSkillsThunk } from "../../../store/skill";
import { Link } from "react-router-dom";
import "./Explore.css";

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
