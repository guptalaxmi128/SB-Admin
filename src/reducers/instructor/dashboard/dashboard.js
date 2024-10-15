import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  course: [],
  draft:[],
  ongoing:[],
  state: "idle",
  error: null,
  success: null,
};

export const iDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INSTRUCTOR_TOTAL_COURSES:
      return {
        ...state,
        course: action.payload,
      };
      case actionTypes.GET_INSTRUCTOR_DRAFT_COURSES:
        return {
          ...state,
          draft: action.payload,
        };
        case actionTypes.GET_INSTRUCTOR_ONGOING_COURSES:
          return {
            ...state,
            ongoing: action.payload,
          };

    default:
      return state;
  }
};

export default iDashboardReducer;
