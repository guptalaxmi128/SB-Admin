import * as api from "../../../api";
import {
  ADD_INSTRUCTOR_COURSE,
  GET_INSTRUCTOR_COURSE_BY_ID,
  ADD_INSTRUCTOR_COURSE_CONTENT,
  INSTRUCTOR_COURSE_PUBLISH,
  INSTRUCTOR_CONTENT_PUBLISH,
  GET_INSTRUCTOR_CONTENT_BY_ID,
  GET_INSTRUCTOR_OTHER_COURSE,
  COURSE_SUBMIT,
  DELETE_INSTRUCTOR_COURSE,
  DELETE_INSTRUCTOR_CONTENT
} from "../../../constants/actionTypes";

export const addInstructorCourse = (formData) => async (dispatch) => {
  try {
    const response = await api.addInstructorCourse(formData);
    dispatch({ type: ADD_INSTRUCTOR_COURSE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstructorCourseById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInstructorCourseById(id);
    dispatch({ type: GET_INSTRUCTOR_COURSE_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addInstructorCourseContent = (title) => async (dispatch) => {
  try {
    const response = await api.addInstructorCourseContent(title);
    dispatch({ type: ADD_INSTRUCTOR_COURSE_CONTENT, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const instructorCoursePublish = (publish) => async (dispatch) => {
  try {
    const response = await api.instructorCoursePublish(publish);
    dispatch({ type: INSTRUCTOR_COURSE_PUBLISH, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const instructorContentPublish = (publish) => async (dispatch) => {
  try {
    const response = await api.instructorContentPublish(publish);
    dispatch({ type: INSTRUCTOR_CONTENT_PUBLISH, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstructorContentById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInstructorContentById(id);
    dispatch({ type: GET_INSTRUCTOR_CONTENT_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInstructorOtherCourse = (params) => async (dispatch) => {
  try {
    const { data } = await api.getInstructorOtherCourse(params);
    dispatch({ type: GET_INSTRUCTOR_OTHER_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const courseSubmit = (id) => async (dispatch) => {
  try {
    const response = await api.courseSubmit(id);
    dispatch({ type: COURSE_SUBMIT, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteInstructorCourse = (id) => async (dispatch) => {
  try {
    const response = await api.deleteInstructorCourse(id);
    dispatch({ type: DELETE_INSTRUCTOR_COURSE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteInstructorContent = (id) => async (dispatch) => {
  try {
    const response = await api.deleteInstructorContent(id);
    dispatch({ type: DELETE_INSTRUCTOR_CONTENT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};