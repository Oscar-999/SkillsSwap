//Action Types ----------------------------------------------------------------

const LOAD_SKILL_REQUEST = "requests/loadRequest"
const DELETE_REQUEST = "requests/deleteRequest"
const CREATE_REQUEST = "requests/createRequest"

//Action Creators ---------------------------------------------------------

export const loadRequest = (requests) => ({
    type: LOAD_SKILL_REQUEST,
    requests,
})


export const deleteRequestAction = (requestId) => ({
    type: DELETE_REQUEST,
    requestId,
})

export const createRequestAction = (request) => ({
    type: CREATE_REQUEST,
    request
})


// Thunk Actions ----------------------------------------------------------------------------------


export const skillRequestThunk = (skillId) => async (dispatch) => {
    try {
    const res = await fetch (`/api/skills/${skillId}/requests`);

    if (res.ok) {
        const SkillRequest = await res.json();
        dispatch(loadRequest(SkillRequest))
    }
    } catch (error) {
        console.log("Error fetching request:", error)
    }
}


export const deleteRequestThunk = (requestId) => async (dispatch) => {
    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        dispatch(deleteRequestAction(requestId));
      } else {
        const errorData = await res.json();
        console.error("Error deleting request:", errorData);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };


export const createRequestThunk =  (formData) => async (dispatch) => {
    try {
      const res = await fetch(`/api/skills/${formData.skillId}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          budget: formData.budget,
          // image: formData.image
        }),
      });

      if (res.ok) {
        const newRequest = await res.json();
        dispatch(createRequestAction(newRequest));
        return newRequest;
      } else {
        const errorData = await res.json();
        console.error("Error creating request:", errorData);
        return errorData;
      }
    } catch (error) {
      console.error("Error creating request:", error);
      return { "message": "An error occurred while creating the request" };
    }
  };


  // Initial State ------------------------------------------------------------------------------------
  const initialState = {
    skill : {
        requests: [],
    },
    user : {
        requests:[],
    }
  }


  // Reducer -----------------------------------------------------------------------
  const requestsReducer = (state = initialState, action) => {

    switch (action.type) {
      case LOAD_SKILL_REQUEST:
        return {
          ...state,
          skill: {
            ...state.skill,
            requests: action.requests,
          },
        };
        case DELETE_REQUEST:
      const updatedRequestAfterDelete = state.skill.requests.filter(request => request.id !== action.requestId);
      return {
        ...state,
        skill: {
          ...state.skill,
          requests: updatedRequestAfterDelete,
        },
      };
      case CREATE_REQUEST:
        return {
          ...state,
          skill: {
            ...state.skill,
            requests: [...state.skill.requests, action.request],
          },
        };
      default:
        return state;
    }
  };

  export default requestsReducer;
