import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  course: [],
  content: [],
  deletedCourse: [],
  courseById: [],
  state: "idle",
  error: null,
  success: null,
};

export const adminCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADMIN_COURSE:
      return {
        ...state,
        course: action.payload.course,
      };
    case actionTypes.GET_ADMIN_COURSE:
      return {
        ...state,
        course: action.payload,
      };
    case actionTypes.GET_DELETED_COURSE:
      return {
        ...state,
        deletedCourse: action.payload,
      };
    case actionTypes.COURSE_STATUS:
    case actionTypes.CONTENT_STATUS:
    case actionTypes.COURSE_PUBLISH:
    case actionTypes.CONTENT_PUBLISH:
    case actionTypes.DELETE_CONTENT:
    case actionTypes.DELETE_COURSE:
    case actionTypes.RESTORE_COURSE:
    case actionTypes.RESTORE_CONTENT:
    case actionTypes.RESTORE_FILE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    case actionTypes.GET_COURSE_BY_ID:
      return {
        ...state,
        courseById: action.payload,
      };
    case actionTypes.ADD_INSTRUCTOR_COURSE_CONTENT:
      return {
        ...state,
        content: action.payload.content,
      };

    default:
      return state;
  }
};

export default adminCourseReducer;
