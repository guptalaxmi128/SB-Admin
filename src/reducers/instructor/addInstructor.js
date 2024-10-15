import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  instructor: [],
  qualification: [],
  experience: [],
  instructorlogin: null,
  isAuthenticated: false,
  success: null,
  state: "idle",
  error: null,
};

// Retrieve the admin profile from localStorage
const storedProfile = localStorage.getItem("profile");
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;

const addInstructorReducer = (
  state = { ...initialState, instructorlogin: initialProfile },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_INSTRUCTOR:
      // Update the stored profile in localStorage when admin is added
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        instructor: action.payload.instructor,
      };
    case actionTypes.VERIFY_OTP:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        isAuthenticated: true,
        instructorlogin: action.payload,
      };
    case actionTypes.LOGIN_INSTRUCTOR:
      return {
        ...state,
        instructorlogin: action.payload,
        isAuthenticated: true,
      };
    case actionTypes.GET_INSTRUCTOR:
      return {
        ...state,
        instructor: action.payload.instructor,
      };
    case actionTypes.UPDATE_INSTRUCTOR:
    case actionTypes.UPDATE_INSTRUCTOR_QUALIFICATION:
    case actionTypes.UPDATE_INSTRUCTOR_EXPERIENCE:
      return {
        ...state,
        success: action.payload,
        error: null,
      };
    case actionTypes.ADD_INSTRUCTOR_QUALIFICATION:
      return {
        ...state,
        qualification: action.payload.qualification,
      };
    case actionTypes.ADD_INSTRUCTOR_EXPERIENCE:
      return {
        ...state,
        experience: action.payload.experience,
      };
      case actionTypes.DELETE_INSTRUCTOR_EXPERIENCE:
        const experienceIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          experience: state.experience.filter(
            (experience) => experience.id !== experienceIdToDelete
          ),
        };
        case actionTypes.DELETE_INSTRUCTOR_QUALIFICATION:
          const qualificationIdToDelete = action.payload;
          // console.log(state.course);
          return {
            ...state,
            qualification: state.qualification.filter(
              (qualification) => qualification.id !== qualificationIdToDelete
            ),
          };
    case actionTypes.LOGOUT_INSTRUCTOR:
      localStorage.removeItem("profile");
      return {
        ...state,
        instructorlogin: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default addInstructorReducer;
