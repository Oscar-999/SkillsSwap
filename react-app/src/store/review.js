// Action Types
const GET_REVIEWS = "reviews/getReviews";
const DELETE_REVIEW = "reviews/deleteReviews";
const CREATE_REVIEW = 'reviews/createReviews';
const UPDATE_REVIEW = 'reviews/updateReview'; // New action type for updating reviews

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
        name: formData.name,
        description: formData.text
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

export const updateReviewThunk = (reviewId, reviewData) => async (dispatch) => { // New thunk action for updating reviews
  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const updatedReview = await res.json();
      dispatch(updateReviewAction(updatedReview));
      return updatedReview;
    } else {
      const errorData = await res.json();
      console.error("Error updating review:", errorData);
      return errorData;
    }
  } catch (error) {
    console.error("Error updating review:", error);
    return { "message": "An error occurred while updating the review" };
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
    default:
      return state;
  }
};

export default reviewsReducer;
