import * as api from "../../../api";
import {
 ADD_ADMIN_INSTRUCTOR,
 GET_ADMIN_INSTRUCTOR,
 APPROVE_INSTRUCTOR,
 DECLINE_INSTRUCTOR,
 DELETE_INSTRUCTOR,
 GET_DELETED_INSTRUCTOR,
 RESTORE_INSTRUCTOR,
 UPDATE_QUALIFICATION_STATUS,
 GET_ADMIN_INSTRUCTOR_BY_ID,
 DELETE_ADMIN_EXPERIENCE,
 DELETE_ADMIN_QUALIFICATION,
 RESTORE_ADMIN_QUALIFICATION,
 RESTORE_ADMIN_EXPERIENCE,
 GET_DELETED_EXPERIENCE,
 GET_DELETED_QUALIFICATION

} from "../../../constants/actionTypes";

export const addAdminInstructor = (userInfo) => async (dispatch) => {
    try {
      const response = await api.addAdminInstructor(userInfo);
      dispatch({ type: ADD_ADMIN_INSTRUCTOR, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getAdminInstructor = (params) => async (dispatch) => {
    try {
      const { data } = await api.getAdminInstructor(params);
      dispatch({ type: GET_ADMIN_INSTRUCTOR, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const approveInstructor = (id) => async (dispatch) => {
    try {
      const { data } = await api.approveInstructor(id);
      dispatch({ type: APPROVE_INSTRUCTOR, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const declineInstructor = (id) => async (dispatch) => {
    try {
      const { data } = await api.declineInstructor(id);
      dispatch({ type: DECLINE_INSTRUCTOR, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteInstructor = (id) => async (dispatch) => {
    try {
      const response = await api.deleteInstructor(id);
      dispatch({ type: DELETE_INSTRUCTOR, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getDeletedInstructor = () => async (dispatch) => {
    try {
      const { data } = await api.getDeletedInstructor();
      dispatch({ type: GET_DELETED_INSTRUCTOR, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const restoreInstructor = (id) => async (dispatch) => {
    try {
      const response = await api.restoreInstructor(id);
      dispatch({ type: RESTORE_INSTRUCTOR, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const updateQualificationStatus = (status) => async (dispatch) => {
    try {
      const response = await api.updateQualificationStatus(status);
      dispatch({ type: UPDATE_QUALIFICATION_STATUS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getAdminInstructorById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getAdminInstructorById(id);
      dispatch({ type: GET_ADMIN_INSTRUCTOR_BY_ID, payload: id });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  export const deleteAdminExperience = (id) => async (dispatch) => {
    try {
      const response = await api.deleteAdminExperience(id);
      dispatch({ type: DELETE_ADMIN_EXPERIENCE, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteAdminQualification = (id) => async (dispatch) => {
    try {
      const response = await api.deleteAdminQualification(id);
      dispatch({ type: DELETE_ADMIN_QUALIFICATION, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const restoreAdminQualification = (id) => async (dispatch) => {
    try {
      const response = await api.restoreAdminQualification(id);
      dispatch({ type: RESTORE_ADMIN_QUALIFICATION, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const restoreAdminExperience = (id) => async (dispatch) => {
    try {
      const response = await api.restoreAdminExperience(id);
      dispatch({ type: RESTORE_ADMIN_EXPERIENCE, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getDeletedQualification = (id) => async (dispatch) => {
    try {
      const { data } = await api.getDeletedQualification(id);
      dispatch({ type: GET_DELETED_QUALIFICATION, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getDeletedExperience = (id) => async (dispatch) => {
    try {
      const { data } = await api.getDeletedExperience(id);
      dispatch({ type: GET_DELETED_EXPERIENCE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };