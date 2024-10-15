import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  title: [],
  video: [],
  file: [],
  contentById: [],
  state: "idle",
  error: null,
  success: null,
};

export const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADMIN_VIDEO:
      return {
        ...state,
        video: action.payload.video,
      };
    case actionTypes.ADD_ADMIN_FILES:
      return {
        ...state,
        file: action.payload.file,
      };
    case actionTypes.FILE_STATUS:
    case actionTypes.FILE_PUBLISH:
      case actionTypes.DELETE_FILE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.ADD_ADMIN_COURSE_CONTENT:
      return {
        ...state,
        title: action.payload.title,
      };
    case actionTypes.GET_CONTENT_BY_ID:
      return {
        ...state,
        contentById: action.payload,
      };

    default:
      return state;
  }
};

export default contentReducer;
