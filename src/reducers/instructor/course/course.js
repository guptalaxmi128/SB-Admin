import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  course: [],
  title: [],
  courseById: [],
  otherCourse: [],
  state: "idle",
  error: null,
  success: null,
};

export const addInstructorCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INSTRUCTOR_COURSE:
      return {
        ...state,
        course: action.payload.course,
      };
    case actionTypes.ADD_INSTRUCTOR_COURSE_CONTENT:
      return {
        ...state,
        title: action.payload.title,
      };
    case actionTypes.GET_INSTRUCTOR_COURSE_BY_ID:
      return {
        ...state,
        courseById: action.payload,
      };
    case actionTypes.INSTRUCTOR_CONTENT_PUBLISH:
    case actionTypes.INSTRUCTOR_COURSE_PUBLISH:
    case actionTypes.COURSE_SUBMIT:
    case actionTypes.DELETE_INSTRUCTOR_COURSE:
    case actionTypes.DELETE_INSTRUCTOR_CONTENT:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.GET_INSTRUCTOR_OTHER_COURSE:
      return {
        ...state,
        otherCourse: action.payload,
      };

    default:
      return state;
  }
};

export default addInstructorCourseReducer;
