import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  student: [],
  studentlogin: null,
  isAuthenticated: false,
  success: null,
  state: "idle",
  error: null,
};

// Retrieve the admin profile from localStorage
const storedProfile = localStorage.getItem("profile");
const initialProfile = storedProfile ? JSON.parse(storedProfile) : null;

const studentReducer = (
  state = { ...initialState, studentlogin: initialProfile },
  action
) => {
  switch (action.type) {
    case actionTypes.REGISTER_STUDENT:
      return {
        ...state,
        student: action.payload.student,
      };
    case actionTypes.REGISTER_STUDENT_VERIFY_OTP:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        isAuthenticated: true,
        studentlogin: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
