import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  instructor: [],
  deletedInstructor: [],
  instructorById: [],
  experience: [],
  qualification: [],
  state: "idle",
  error: null,
  success: null,
};

export const adminInstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADMIN_INSTRUCTOR:
      return {
        ...state,
        instructor: action.payload.intructor,
      };
    case actionTypes.GET_ADMIN_INSTRUCTOR:
      return {
        ...state,
        instructor: action.payload,
      };

    case actionTypes.APPROVE_INSTRUCTOR:
    case actionTypes.DECLINE_INSTRUCTOR:
    case actionTypes.RESTORE_INSTRUCTOR:
    case actionTypes.UPDATE_QUALIFICATION_STATUS:
    case actionTypes.RESTORE_ADMIN_EXPERIENCE:
    case actionTypes.RESTORE_ADMIN_QUALIFICATION:
      return {
        ...state,
        success: action.payload,
        error: null,
      };

    case actionTypes.DELETE_INSTRUCTOR:
      const instructorIdToDelete = action.payload;
      // console.log(state.course);
      return {
        ...state,
        instructor: state.instructor.data.filter(
          (instructor) => instructor.id !== instructorIdToDelete
        ),
      };
    case actionTypes.GET_DELETED_INSTRUCTOR:
      return {
        ...state,
        deletedInstructor: action.payload,
      };
    case actionTypes.GET_ADMIN_INSTRUCTOR_BY_ID:
      return {
        ...state,
        instructorById: action.payload,
      };
    case actionTypes.DELETE_ADMIN_EXPERIENCE:
      const experienceIdToDelete = action.payload;
      // console.log(state.course);
      return {
        ...state,
        experience: state.experience.filter(
          (experience) => experience.id !== experienceIdToDelete
        ),
      };
    case actionTypes.DELETE_ADMIN_QUALIFICATION:
      const qualificationIdToDelete = action.payload;
      // console.log(state.course);
      return {
        ...state,
        qualification: state.qualification.filter(
          (qualification) => qualification.id !== qualificationIdToDelete
        ),
      };

    //   case actionTypes.APPROVE_INSTRUCTOR_UPDATION:
    //     return {
    //       ...state,
    //       success: action.payload,
    //       error: null,
    //     };
    //   case actionTypes.DECLINE_INSTRUCTOR_UPDATION:
    //     return {
    //       ...state,
    //       success: action.payload,
    //       error: null,
    //     };
    // case actionTypes.GET_UPDATION_INSTRUCTOR:
    //   return {
    //     ...state,
    //     updationInstructor: action.payload,
    //   };

    default:
      return state;
  }
};

export default adminInstructorReducer;
