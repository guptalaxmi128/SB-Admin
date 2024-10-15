import * as api from "../../../api";
import {
ADD_INSTRUCTOR_VIDEO,
ADD_INSTRUCTOR_FILES,
INSTRUCTOR_FILE_PUBLISH,
CONTENT_SUBMIT,
CONTENT_FILE_SUBMIT,
DELETE_INSTRUCTOR_FILE
} from "../../../constants/actionTypes";

export const addInstructorVideo = (video) => async (dispatch) => {
    try {
      const response = await api.addInstructorVideo(video);
      dispatch({ type: ADD_INSTRUCTOR_VIDEO, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const addInstructorFile = (formData) => async (dispatch) => {
    try {
      const response = await api.addInstructorFile(formData);
      dispatch({ type: ADD_INSTRUCTOR_FILES, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const instructorFilePublish = (publish) => async (dispatch) => {
    try {
      const response = await api.instructorFilePublish(publish);
      dispatch({ type: INSTRUCTOR_FILE_PUBLISH, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const contentSubmit= (id) => async (dispatch) => {
    try {
      const response = await api.contentSubmit(id);
      dispatch({ type: CONTENT_SUBMIT, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const contentFileSubmit= (id) => async (dispatch) => {
    try {
      const response = await api.contentFileSubmit(id);
      dispatch({ type: CONTENT_FILE_SUBMIT, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteInstructorFile = (id) => async (dispatch) => {
    try {
      const response = await api.deleteInstructorFile(id);
      dispatch({ type: DELETE_INSTRUCTOR_FILE, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };