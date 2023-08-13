// Action Types
const GET_REVIEWS = "reviews/getReviews";

// Action Creators
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

// Thunk Action
export const fetchReviews = (skillId) => async (dispatch) => {
  const res = await fetch(`/api/skills/${skillId}/reviews`);

  if (res.ok) {
    const skillReviews = await res.json();
    dispatch(getReviews(skillReviews));
  }
};

// Initial State
const initialState = {
  skill: {
    reviews: [],
  },
  user: {},
};

// Reducer
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        skill: {
          ...state.skill,
          reviews: action.reviews,
        },
      };
    default:
      return state;
  }
};

export default reviewsReducer;
