import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  courseType: [],
  state: "idle",
  error: null,
  success: null,
};

export const courseTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSE_TYPE:
      return {
        ...state,
        courseType: action.payload.courseType,
      };
    case actionTypes.GET_COURSE_TYPE:
      return {
        ...state,
        courseType: action.payload,
      };
      case actionTypes.DELETE_COURSE_TYPE:
        const  courseTypeIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          courseType: state.courseType.data.filter(
            ( courseType) =>  courseType.id !==  courseTypeIdToDelete
          ),
        };

    default:
      return state;
  }
};

export default courseTypeReducer;
