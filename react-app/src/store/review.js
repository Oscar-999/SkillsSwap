// Action Types
const GET_REVIEWS = "reviews/getReviews";
const DELETE_REVIEW = "reviews/deleteReviews"
// Action Creators
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}
// Thunk Action
export const fetchReviews = (skillId) => async (dispatch) => {
  const res = await fetch(`/api/skills/${skillId}/reviews`);

  if (res.ok) {
    const skillReviews = await res.json();
    dispatch(getReviews(skillReviews));
  }
};


export const deleteReviewThunk = reviewId => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if(res.ok) {
    return dispatch(deleteReviewAction(reviewId))
  } else {
    return {"message": "There was a problem deleting the review"}
  }
}
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
