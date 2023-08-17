// // action types -------------------------------------------------------
// const LOAD_ALL_REQUESTS = "skillswap/requests/LOAD_ALL_REQUESTS";
// const LOAD_SINGLE_REQUEST = "skillswap/requests/LOAD_SINGLE_REQUEST"
// const UPDATE_REQUEST = "skillswap/request/UPDATE_REQUEST"
// const CREATE_REQUEST = "skillswap/requests/CREATE_REQUEST"
// const DELETE_REQUEST = "skillswap/requests/DELETE_REQUEST"
// // action creators ---------------------------------------------------

// export const loadAllRequestsAction = (requests) => {
//   return {
//     type: LOAD_ALL_REQUESTS,
//     requests,
//   };
// };

// export const loadSingleRequestAction =(request) => {
//   return {
//     type: LOAD_SINGLE_REQUEST,
//     request
//   }
// }

// export const updateRequestAction = (request) => {
//   return {
//     type: UPDATE_REQUEST,
//     request
//   }
// }

// export const createRequestAction = (request) => {
//   return {
//     type: CREATE_REQUEST,
//     payload: request
//   }
// }

// export const deleteRequestAction = (requestId) => {
//   return {
//     type: DELETE_REQUEST,
//     requestId
//   }
// }
// // thunk action creators ---------------------------
// export const loadAllRequestsThunk = () => async (dispatch) => {
//     const res = await fetch("/api/requests/all", {
//       headers: {
//         method: "GET",
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(loadAllRequestsAction(data));
//       return data;
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   };


//   export const loadSingleRequestThunk = (requestId) => async (dispatch) => {
//     const res = await fetch(`/api/requests/${requestId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })

//     if (res.ok) {
//       const requestData = await res.json();
//       dispatch(loadSingleRequestAction(requestData));
//       return requestData
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   }

//   export const updateRequestThunk = (form) => async (dispatch) => {
//     const res = await fetch(`/api/requests/${form.get('id')}`, {
//       method: "PUT",
//       body: form,
//     });
//     const updatedRequest = await res.json();
//     if (res.ok) {
//       dispatch(updateRequestAction(updatedRequest));
//       return updatedRequest;
//     } else {
//       return updatedRequest
//     }
//   }

//   export const createRequestThunk = (formData) => async (dispatch) => {
//     const res = await fetch("/api/requests/create", {
//       method: "POST",
//       body: formData
//     })

//     const requestData = await res.json();

//     if (res.ok) {
//       dispatch(createRequestAction(requestData));
//       return requestData;
//     } else {
//       return requestData.errors
//     }
//   }

//   export const deleteRequestThunk = (requestId) => async(dispatch) => {
//     const res = await fetch(`/api/requests/${requestId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     if (res.ok) {
//       dispatch(deleteRequestAction(requestId))
//     } else {
//       const errors = await res.json();
//       return errors;
//     }
//   }
// // reducer----------------------------------------------------------------------------------------------------------
// const initialState = { allRequests: {}, singleRequest: {} };
// // --------------------------------------------------------------------------------------------------------
// const requestsReducer = (state = initialState, action) => {
//   let newState;

//   switch (action.type) {

//     case LOAD_ALL_REQUESTS:
//       newState = { ...state, allRequests: {} };
//       action.requests.forEach(
//         (request) => (newState.allRequests[request.id] = request)
//       );
//       return newState;
//     case LOAD_SINGLE_REQUEST:
//         newState = {...state, singleRequest: {}}
//         newState.singleRequest = {...action.request}
//         return {
//           ...state,
//           singleRequest: action.request
//         }
//         case CREATE_REQUEST:
//           newState = { ...state };
//           let newRequest = action.payload;

//           newState.allRequests[newRequest.id] = newRequest;
//           newState.singleRequest = newRequest;
//           return newState;
//         case UPDATE_REQUEST:
//           newState = {
//             ...state,
//             allRequests: {
//               ...state.allRequests,
//               [action.request.id]: action.request,
//             },
//           };
//           return newState;
//         case DELETE_REQUEST:
//           newState = {
//             ...state,
//             singleRequest: {
//               ...state.allRequests
//             }
//           };
//           delete newState.allRequests[action.request];
//           return newState;
//     default:
//       return state;
//   }
// };

// export default requestsReducer;
