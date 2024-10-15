import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  review: [],
  state: "idle",
  error: null,
  success: null,
};

export const iReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_IREVIEW:
      return {
        ...state,
        review: action.payload,
      };

    case actionTypes.DELETE_IREVIEW:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default iReviewReducer;
