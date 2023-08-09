// action types -------------------------------------------------------

const LOAD_ALL_SKILLS = "skillswap/skills/LOAD_ALL_SKILLS";
// action creators ---------------------------------------------------

export const loadAllSkillsAction = (skills) => {
  return {
    type: LOAD_ALL_SKILLS,
    skills,
  };
};
// thunk action creators ---------------------------

export const loadAllSkillsThunk = () => async (dispatch) => {
  const res = await fetch("/api/skills/", {
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
    default:
      return state;
  }
};

export default skillsReducer;
