import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  coupon: [],
  state: "idle",
  error: null,
  success: null,
};

export const addInstructorCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INSTRUCTOR_COUPON:
      return {
        ...state,
        coupon: action.payload.coupon,
      };
    case actionTypes.GET_INSTRUCTOR_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case actionTypes.DELETE_INSTRUCTOR_COUPON:
      const couponIdToDelete = action.payload;
      // console.log(state.course);
      return {
        ...state,
        coupon: state.coupon.data.filter(
          (coupon) => coupon.id !== couponIdToDelete
        ),
      };
    case actionTypes.ADD_COUPON_TO_COURSE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default addInstructorCouponReducer;
