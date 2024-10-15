import * as api from "../../api";
import {
  REGISTER_STUDENT,
  REGISTER_STUDENT_VERIFY_OTP,
} from "../../constants/actionTypes";

export const registerStudent = (userInfo) => async (dispatch) => {
  try {
    const res = await api.registerStudent(userInfo);
    dispatch({ type: REGISTER_STUDENT, payload: res.data });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyRStudent = (userInfo) => async (dispatch) => {
  try {
    const res = await api.verifyRStudent(userInfo);
    dispatch({ type: REGISTER_STUDENT_VERIFY_OTP, payload: res.data });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
