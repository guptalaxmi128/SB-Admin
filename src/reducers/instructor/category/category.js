import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  category: [],
  state: "idle",
  error: null,
  success: null,
};

export const instructorCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case actionTypes.GET_INSTRUCTOR_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default instructorCategoryReducer;
