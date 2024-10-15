import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  university: [],
  particularUniversity: [],
  institite: [],
  state: "idle",
  error: null,
  success: null,
};

export const universityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_UNIVERSITY:
      return {
        ...state,
        university: action.payload.university,
      };
    case actionTypes.GET_UNIVERSITY:
      return {
        ...state,
        university: action.payload,
      };
    case actionTypes.GET_PARTICULAR_UNIVERSITY:
      return {
        ...state,
        particularUniversity: action.payload,
      };
    case actionTypes.GET_PARTICULAR_INSTITUTE:
      return {
        ...state,
        institute: action.payload,
      };
    case actionTypes.DELETE_UNIVERSITY:
      const universityIdToDelete = action.payload;
      // console.log(state.course);
      return {
        ...state,
        university: state.university.data.filter(
          (university) => university.id !== universityIdToDelete
        ),
      };

    default:
      return state;
  }
};

export default universityReducer;
