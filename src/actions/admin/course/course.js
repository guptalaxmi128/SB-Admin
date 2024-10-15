import * as api from "../../../api";
import {
ADD_ADMIN_COURSE,
GET_ADMIN_COURSE,
// GET_ADMIN_INSTRUCTOR_COURSE,
COURSE_STATUS,
CONTENT_STATUS,
GET_COURSE_BY_ID,
COURSE_PUBLISH,
CONTENT_PUBLISH,
DELETE_CONTENT,
DELETE_COURSE,
GET_DELETED_COURSE,
RESTORE_COURSE,
RESTORE_CONTENT,
RESTORE_FILE
// ADD_ADMIN_CONTENT_TITLE

} from "../../../constants/actionTypes";

export const addAdminCourse = (formData) => async (dispatch) => {
    try {
      const response = await api.addAdminCourse(formData);
      dispatch({ type: ADD_ADMIN_COURSE, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getAdminCourse = (status) => async (dispatch) => {  
    try {
      const { data } = await api.getAdminCourse(status);
      dispatch({ type: GET_ADMIN_COURSE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // export const getAdminInstructorCourse = (status) => async (dispatch) => {
  //   try {
  //     const { data } = await api.getAdminInstructorCourse(status);
  //     dispatch({ type: GET_ADMIN_INSTRUCTOR_COURSE, payload: data });
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  export const courseStatus = (status) => async (dispatch) => {
    try {
      const { data } = await api.courseStatus(status);
      dispatch({ type: COURSE_STATUS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  



  export const getCourseById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getCourseById(id);
      dispatch({ type: GET_COURSE_BY_ID, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const contentStatus = (status) => async (dispatch) => {
    try {
      const { data } = await api.contentStatus(status);
      dispatch({ type: CONTENT_STATUS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const coursePublish = (publish) => async (dispatch) => {
    try {
      const response = await api.coursePublish(publish);
      dispatch({ type: COURSE_PUBLISH, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const contentPublish = (publish) => async (dispatch) => {
    try {
      const response = await api.contentPublish(publish);
      dispatch({ type: CONTENT_PUBLISH, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

 
export const deleteCourse = (id) => async (dispatch) => {
  try {
    const response = await api.deleteCourse(id);
    dispatch({ type: DELETE_COURSE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteContent = (id) => async (dispatch) => {
  try {
    const response = await api.deleteContent(id);
    dispatch({ type: DELETE_CONTENT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDeletedCourse = () => async (dispatch) => {  
  try {
    const { data } = await api.getDeletedCourse();
    dispatch({ type: GET_DELETED_COURSE, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const restoreCourse = (id) => async (dispatch) => {
  try {
    const response = await api.restoreCourse(id);
    dispatch({ type: RESTORE_COURSE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const restoreContent = (id) => async (dispatch) => {
  try {
    const response = await api.restoreContent(id);
    dispatch({ type: RESTORE_CONTENT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const restoreFile = (id) => async (dispatch) => {
  try {
    const response = await api.restoreFile(id);
    dispatch({ type: RESTORE_FILE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};