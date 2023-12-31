// Action Types
const GET_REVIEWS = "reviews/getReviews";
const DELETE_REVIEW = "reviews/deleteReviews";
const CREATE_REVIEW = 'reviews/createReviews';
const UPDATE_REVIEW = 'reviews/updateReview';
const GET_ALL_USER_REVIEWS = "reviews/getAllUserReviews";


// Action Creators
export const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const createReviewAction = (review) => ({
  type: CREATE_REVIEW,
  review,
});

export const updateReviewAction = (updatedReview) => ({ // New action creator for updating reviews
  type: UPDATE_REVIEW,
  updatedReview,
});

export const getAllUserReviews = (userReviews) => ({
  type: GET_ALL_USER_REVIEWS,
  userReviews,
});

// Thunk Actions
export const fetchReviews = (skillId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/skills/${skillId}/reviews`);

    if (res.ok) {
      const skillReviews = await res.json();
      dispatch(getReviews(skillReviews));
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      dispatch(deleteReviewAction(reviewId));
    } else {
      const errorData = await res.json();
      console.error("Error deleting review:", errorData);
    }
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

export const createReviewThunk =  formData => async (dispatch) => {
  try {
    const res = await fetch(`/api/skills/${formData.skillId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: formData.text
      }),
    });

    if (res.ok) {
      const newReview = await res.json();
      dispatch(createReviewAction(newReview));
      return newReview;
    } else {
      const errorData = await res.json();
      console.error("Error creating review:", errorData);
      return errorData;
    }
  } catch (error) {
    console.error("Error creating review:", error);
    return { "message": "An error occurred while creating the review" };
  }
};

export const updateReviewThunk = (formData) => async (dispatch) => { // New thunk action for updating reviews
  const submission = {};
    if (formData.text) submission.text = formData.text;

    const res = await fetch(`/api/reviews/${formData.reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    if (res.ok) {
      const data = await res.json();
      return dispatch(updateReviewAction(data));
  } else {
      const errors = await res.json();
      return errors;
  }
};

export const fetchAllUserReviewsThunk = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/current`);

    if (res.ok) {
      const userReviews = await res.json();
      dispatch(getAllUserReviews(userReviews));
    }
  } catch (error) {
    console.error("Error fetching all user reviews:", error);
  }
};

// Initial State
const initialState = {
  skill: {
    reviews: [],
  },
  user: {
    reviews: [],
  },
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
    case DELETE_REVIEW:
      const updatedReviewsAfterDelete = state.skill.reviews.filter(review => review.id !== action.reviewId);
      return {
        ...state,
        skill: {
          ...state.skill,
          reviews: updatedReviewsAfterDelete,
        },
      };
    case CREATE_REVIEW:
      return {
        ...state,
        skill: {
          ...state.skill,
          reviews: [...state.skill.reviews, action.review],
        },
      };
    case UPDATE_REVIEW:
      const updatedReviewsAfterUpdate = state.skill.reviews.map(review => {
        if (review.id === action.updatedReview.id) {
          return action.updatedReview;
        }
        return review;
      });
      return {
        ...state,
        skill: {
          ...state.skill,
          reviews: updatedReviewsAfterUpdate,
        },
      };
      case GET_ALL_USER_REVIEWS:
      return {
        ...state,
        user: {
          ...state.user,
          reviews: action.userReviews,
        },
      };
    default:
      return state;
  }
};

export default reviewsReducer;
