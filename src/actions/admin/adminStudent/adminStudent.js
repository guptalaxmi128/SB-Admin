import * as api from "../../../api";
import {
 ADD_ADMIN_STUDENT,
 GET_ADMIN_STUDENT,
 DELETE_STUDENT,
 GET_DELETED_STUDENT,
 RESTORE_STUDENT,
 VERIFY_STUDENT,
 ASSIGN_COURSE

} from "../../../constants/actionTypes";

export const addAdminStudent = (userInfo) => async (dispatch) => {
    try {
      const response = await api.addAdminStudent(userInfo);
      dispatch({ type: ADD_ADMIN_STUDENT, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getAdminStudent = () => async (dispatch) => {
    try {
      const { data } = await api.getAdminStudent();
      dispatch({ type: GET_ADMIN_STUDENT, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  export const deleteStudent = (id) => async (dispatch) => {
    try {
      const response = await api.deleteStudent(id);
      dispatch({ type: DELETE_STUDENT, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getDeletedStudent = () => async (dispatch) => {
    try {
      const { data } = await api.getDeletedStudent();
      dispatch({ type: GET_DELETED_STUDENT, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const restoreStudent = (id) => async (dispatch) => {
    try {
      const response = await api.restoreStudent(id);
      dispatch({ type: RESTORE_STUDENT, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  
  export const verifyStudent = (id) => async (dispatch) => {
    try {
      const response = await api.verifyStudent(id);
      dispatch({ type: VERIFY_STUDENT, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const assignCourse = (course) => async (dispatch) => {
    try {
      const response = await api.assignCourse(course);
      dispatch({ type: ASSIGN_COURSE, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
