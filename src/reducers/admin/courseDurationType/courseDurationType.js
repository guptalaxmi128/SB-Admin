import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  courseDurationType: [],
  state: "idle",
  error: null,
  success: null,
};

export const courseDurationTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSE_DURATION_TYPE:
      return {
        ...state,
        courseDurationType: action.payload.courseDurationType,
      };
    case actionTypes.GET_COURSE_DURATION_TYPE:
      return {
        ...state,
        courseDurationType: action.payload,
      };
    case actionTypes.DELETE_COURSE_DURATION_TYPE:
      const courseDurationIdToDelete = action.payload;
      // console.log(state.course);
      return {
        ...state,
        courseDurationType: state.courseDurationType.data.filter(
          (courseDuration) => courseDuration.id !== courseDurationIdToDelete
        ),
      };

    default:
      return state;
  }
};

export default courseDurationTypeReducer;
