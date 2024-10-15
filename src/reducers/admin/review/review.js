import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  review: [],
  state: "idle",
  error: null,
  success: null,
};

export const aReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AREVIEW:
      return {
        ...state,
        review: action.payload,
      };

    case actionTypes.DELETE_AREVIEW:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default aReviewReducer;
