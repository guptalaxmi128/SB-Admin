import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  payment: [],
  state: "idle",
  error: null,
  success: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PAYMENT:
      return {
        ...state,
        payment: action.payload.payment,
      };

    default:
      return state;
  }
};

export default paymentReducer;
