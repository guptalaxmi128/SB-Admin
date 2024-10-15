import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
    courseDuration: [],
  state: "idle",
  error: null,
  success: null,
};

export const courseDurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSE_DURATION:
      return {
        ...state,
        courseDuration: action.payload.courseDuration,
      };
    case actionTypes.GET_COURSE_DURATION:
      return {
        ...state,
        courseDuration: action.payload,
      };
      case actionTypes.DELETE_COURSE_DURATION:
        const courseDurationIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          courseDuration: state.courseDuration.data.filter(
            (courseDuration) => courseDuration.id !== courseDurationIdToDelete
          ),
        };

    default:
      return state;
  }
};

export default courseDurationReducer;
