import * as api from "../../../api";
import {
  GET_TOTAL_COURSE,
  GET_DRAFT_COURSE,
  GET_PENDING_COURSE,
  GET_VERIFIED_COURSE,
  GET_PUBLISHED_COURSE,
  GET_ATOTAL_STUDENT,
  GET_TOTAL_INSTRUCTOR,
} from "../../../constants/actionTypes";

export const getTotalCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getTotalCourse();
    dispatch({ type: GET_TOTAL_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDraftCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getDraftCourse();
    dispatch({ type: GET_DRAFT_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPendingCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getPendingCourse();
    dispatch({ type: GET_PENDING_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getVerifiedCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getVerifiedCourse();
    dispatch({ type: GET_VERIFIED_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPublishedCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getPublishedCourse();
    dispatch({ type: GET_PUBLISHED_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getATotalStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getATotalStudent();
    dispatch({ type: GET_ATOTAL_STUDENT, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTotalInstructor = () => async (dispatch) => {
  try {
    const { data } = await api.getTotalInstructor();
    dispatch({ type: GET_TOTAL_INSTRUCTOR, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
