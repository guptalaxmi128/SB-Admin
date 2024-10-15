import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  coupon: [],
  deletedCoupon:[],
  state: "idle",
  error: null,
  success: null,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COUPON:
      return {
        ...state,
        coupon: action.payload.coupon,
      };
    case actionTypes.GET_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
      case actionTypes.GET_DELETED_COUPON:
        return {
          ...state,
          deletedCoupon: action.payload,
        };
        case actionTypes.RESTORE_COUPON:
          case actionTypes.COUPON_STATUS:
            case actionTypes.COUPON_TO_COURSE:
          return {
            ...state,
            success: action.payload,
            error: null,
          };
      case actionTypes.DELETE_COUPON:
        const couponIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          coupon: state.coupon.data.filter(
            (coupon) => coupon.id !== couponIdToDelete
          ),
        };

    default:
      return state;
  }
};

export default couponReducer;
