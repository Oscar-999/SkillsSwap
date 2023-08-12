// action types -------------------------------------------------------
const LOAD_ALL_SKILLS = "skillswap/skills/LOAD_ALL_SKILLS";
const LOAD_SINGLE_SKILL = "skillswap/skills/LOAD_SINGLE_SKILL"
const UPDATE_SKILL = "skillswap/skills/UPDATE_SKILL"
const CREATE_SKILL = "skillswap/skills/CREATE_SKILL"
const DELETE_SKILL = "skillswap/skills/DELETE_SKILL"
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

export const updateSkillAction = (skill) => {
  return {
    type: UPDATE_SKILL,
    skill
  }
}

export const createSkillAction = (skill) => {
  return {
    type: CREATE_SKILL,
    payload: skill
  }
}

export const deleteSkillAction = (skillId) => {
  return {
    type: DELETE_SKILL,
    skillId
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

export const updateSkillThunk = (form) => async (dispatch) => {
  const res = await fetch(`/api/skills/${form.get('id')}`, {
    method: "PUT",
    body: form,
  });
  const updatedSkill = await res.json();
  if (res.ok) {
    dispatch(updateSkillAction(updatedSkill));
    return updatedSkill;
  } else {
    return updatedSkill
  }
}

export const createSkillThunk = (formData) => async (dispatch) => {
  const res = await fetch("/api/skills/create", {
    method: "POST",
    body: formData
  })

  const skillData = await res.json();

  if (res.ok) {
    dispatch(createSkillAction(skillData));
    return skillData;
  } else {
    return skillData.errors
  }
}

export const deleteSkillThunk = (skillId) => async(dispatch) => {
  const res = await fetch(`/api/skills/${skillId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (res.ok) {
    dispatch(deleteSkillAction(skillId))
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
        case CREATE_SKILL:
          newState = { ...state };
          let newSkill = action.payload;

          newState.allSkills[newSkill.id] = newSkill;
          newState.singleSkill = newSkill;
          return newState;
        case UPDATE_SKILL:
          newState = {
            ...state,
            allSkills: {
              ...state.allSkills,
              [action.skill.id]: action.skill,
            },
          };
          return newState;
        case DELETE_SKILL:
          newState = {
            ...state,
            singleSkill: {
              ...state.allSkills
            }
          };
          delete newState.allSkills[action.skill];
          return newState;
    default:
      return state;
  }
};

export default skillsReducer;
