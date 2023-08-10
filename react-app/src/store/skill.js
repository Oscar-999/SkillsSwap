// action types -------------------------------------------------------
const LOAD_ALL_SKILLS = "skillswap/skills/LOAD_ALL_SKILLS";
const LOAD_SINGLE_SKILL = "skillswap/skills/LOAD_SINGLE_SKILL"
// action creators ---------------------------------------------------

export const loadAllSkillsAction = (skills) => {
  return {
    type: LOAD_ALL_SKILLS,
    skills,
  };
};

export const loadSingleSkillAction =(skill) => {
  return {
    type: LOAD_SINGLE_SKILL,
    skill
  }
}

// thunk action creators ---------------------------

export const loadAllSkillsThunk = () => async (dispatch) => {
  const res = await fetch("/api/skills/all", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadAllSkillsAction(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const loadSingleSkillThunk = (skillId) => async (dispatch) => {
  const res = await fetch(`/api/skills/${skillId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (res.ok) {
    const skillData = await res.json();
    dispatch(loadSingleSkillAction(skillData));
    return skillData
  } else {
    const errors = await res.json();
    return errors;
  }
}

// reducer----------------------------------------------------------------------------------------------------------
const initialState = { allSkills: {}, singleSkill: {} };
// --------------------------------------------------------------------------------------------------------
const skillsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case LOAD_ALL_SKILLS:
      newState = { ...state, allSkills: {} };
      action.skills.forEach(
        (skill) => (newState.allSkills[skill.id] = skill)
      );
      return newState;
    case LOAD_SINGLE_SKILL:
        newState = {...state, singleSkill: {}}
        newState.singleSkill = {...action.skill}
        return {
          ...state,
          singleSkill: action.skill
        }
    default:
      return state;
  }
};

export default skillsReducer;
