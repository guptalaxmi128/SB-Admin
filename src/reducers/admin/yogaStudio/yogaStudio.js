import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
yogaStudio: [],
  state: "idle",
  error: null,
  success: null,
};

export const yogaStudioReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case actionTypes.GET_YOGA_STUDIO:
      return {
        ...state,
        yogaStudio: action.payload,
      };
      case actionTypes.YOGA_STUDIO_STATUS:
        return {
          ...state,
          success: action.payload,
          error: null,
        };
  

    default:
      return state;
  }
};

export default yogaStudioReducer;
