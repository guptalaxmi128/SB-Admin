import * as api from "../../../api";
import {
  FILE_STATUS,
  ADD_ADMIN_COURSE_CONTENT,
  GET_CONTENT_BY_ID,
  ADD_ADMIN_FILES,
  ADD_ADMIN_VIDEO,
  FILE_PUBLISH,
  DELETE_FILE,
} from "../../../constants/actionTypes";

export const fileStatus = (status) => async (dispatch) => {
  try {
    const { data } = await api.fileStatus(status);
    dispatch({ type: FILE_STATUS, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addAdminCourseContent = (title) => async (dispatch) => {
  try {
    const response = await api.addAdminCourseContent(title);
    dispatch({ type: ADD_ADMIN_COURSE_CONTENT, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getContentById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getContentById(id);
    dispatch({ type: GET_CONTENT_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addAdminVideo = (video) => async (dispatch) => {
  try {
    const response = await api.addAdminVideo(video);
    dispatch({ type: ADD_ADMIN_VIDEO, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addAdminFile = (formData) => async (dispatch) => {
  try {
    const response = await api.addAdminFile(formData);
    dispatch({ type: ADD_ADMIN_FILES, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const filePublish = (publish) => async (dispatch) => {
  try {
    const response = await api.filePublish(publish);
    dispatch({ type: FILE_PUBLISH, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteFile = (id) => async (dispatch) => {
  try {
    const response = await api.deleteFile(id);
    dispatch({ type: DELETE_FILE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
