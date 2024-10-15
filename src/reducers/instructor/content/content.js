import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  video: [],
  file: [],
  contentById: [],
  state: "idle",
  error: null,
  success: null,
};

export const addInstructorContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INSTRUCTOR_VIDEO:
      return {
        ...state,
        video: action.payload.video,
      };
    case actionTypes.ADD_INSTRUCTOR_FILES:
      return {
        ...state,
        file: action.payload.file,
      };
    case actionTypes.GET_INSTRUCTOR_CONTENT_BY_ID:
      return {
        ...state,
        contentById: action.payload,
      };
    case actionTypes.INSTRUCTOR_FILE_PUBLISH:
      case actionTypes.CONTENT_SUBMIT:
        case actionTypes.CONTENT_FILE_SUBMIT:
          case actionTypes.DELETE_INSTRUCTOR_FILE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
     

    default:
      return state;
  }
};

export default addInstructorContentReducer;
