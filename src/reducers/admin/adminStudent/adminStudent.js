import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  student: [],
  deletedStudent: [],
  assignCourse:[],
  state: "idle",
  error: null,
  success: null,
};

export const adminStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ADMIN_STUDENT:
        return {
          ...state,
          student: action.payload.student,
        };
    case actionTypes.GET_ADMIN_STUDENT:
      return {
        ...state,
        student: action.payload,
      };
      case actionTypes.RESTORE_STUDENT:
      case actionTypes.VERIFY_STUDENT:
        return {
          ...state,
          success: action.payload,
          error: null,
        };
  
      case actionTypes.DELETE_STUDENT:
        const studentIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          student: state.student.data.filter(
            (student) => student.id !== studentIdToDelete
          ),
        };
      case actionTypes.GET_DELETED_STUDENT:
        return {
          ...state,
          deletedStudent: action.payload,
        };
        case actionTypes.ASSIGN_COURSE:
          return {
            ...state,
            assignCourse: action.payload.assignCourse,
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

export default adminStudentReducer;
