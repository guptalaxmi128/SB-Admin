import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  state: "idle",
  error: null,
  success: null,
};

export const sCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPLY_COUPON_COURSE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default sCourseReducer;
