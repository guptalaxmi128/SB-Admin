import * as api from "../../../api";
import {
  ADD_INSTRUCTOR,
  LOGIN_INSTRUCTOR,
  GET_INSTRUCTOR,
  VERIFY_OTP,
  UPDATE_INSTRUCTOR,
  ADD_INSTRUCTOR_QUALIFICATION,
  ADD_INSTRUCTOR_EXPERIENCE,
  UPDATE_INSTRUCTOR_QUALIFICATION,
  UPDATE_INSTRUCTOR_EXPERIENCE,
  DELETE_INSTRUCTOR_EXPERIENCE,
  DELETE_INSTRUCTOR_QUALIFICATION,
  GET_INSTRUCTOR_QUALIFICATION_BY_ID,
  GET_INSTRUCTOR_EXPERIENCE_BY_ID
} from "../../../constants/actionTypes";

export const addInstructor = (instructor) => async (dispatch) => {
  try {
    const { data } = await api.addInstructor(instructor);
    dispatch({ type: ADD_INSTRUCTOR, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginInstructor = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.loginInstructor(userInfo);
    dispatch({ type: LOGIN_INSTRUCTOR, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstructor = () => async (dispatch) => {
  try {
    const { data } = await api.getInstructor();
    dispatch({ type: GET_INSTRUCTOR, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyOtp = (otpInfo) => async (dispatch) => {
  try {
    const { data } = await api.verifyOtp(otpInfo);
    dispatch({ type: VERIFY_OTP, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateInstructor = (formData) => async (dispatch) => {
  try {
    const response = await api.updateInstructor(formData);
    dispatch({ type: UPDATE_INSTRUCTOR, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addInstructorQualification = (formData) => async (dispatch) => {
  try {
    const response = await api.addInstructorQualification(formData);
    dispatch({ type: ADD_INSTRUCTOR_QUALIFICATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addInstructorExperience = (experience) => async (dispatch) => {
  try {
    const res = await api.addInstructorExperience(experience);
    dispatch({ type: ADD_INSTRUCTOR_EXPERIENCE, payload: res.data });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateInstructorQualification = (formData) => async (dispatch) => {
  try {
    const id = formData.get("id");
    const response = await api.updateInstructorQualification(formData,id);
    dispatch({ type: UPDATE_INSTRUCTOR_QUALIFICATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateInstructorExperience = (experience) => async (dispatch) => {
  try {
    const response = await api.updateInstructorExperience(experience);
    dispatch({ type: UPDATE_INSTRUCTOR_EXPERIENCE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteInstructorExperience = (id) => async (dispatch) => {
  try {
    const response = await api.deleteInstructorExperience(id);
    dispatch({ type: DELETE_INSTRUCTOR_EXPERIENCE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteInstructorQualification = (id) => async (dispatch) => {
  try {
    const response = await api.deleteInstructorQualification(id);
    dispatch({ type: DELETE_INSTRUCTOR_QUALIFICATION, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getInstructorQualificationById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInstructorQualificationById(id);
    dispatch({ type: GET_INSTRUCTOR_QUALIFICATION_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstructorExpericenceById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInstructorExperienceById(id);
    dispatch({ type: GET_INSTRUCTOR_EXPERIENCE_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};