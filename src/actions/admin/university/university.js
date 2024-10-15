import * as api from "../../../api";
import { ADD_UNIVERSITY, DELETE_UNIVERSITY, GET_UNIVERSITY,GET_PARTICULAR_UNIVERSITY,GET_PARTICULAR_INSTITUTE } from "../../../constants/actionTypes";

export const addUniversity = (university) => async (dispatch) => {
  try {
    const response = await api.addUniversity(university)
    dispatch({ type: ADD_UNIVERSITY, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getUniversity = () => async (dispatch) => {  
    try {
      const { data } = await api.getUniversity();
      dispatch({ type: GET_UNIVERSITY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteUniversity = (id) => async (dispatch) => {
    try {
      const response = await api.deleteUniversity(id);
      dispatch({ type: DELETE_UNIVERSITY, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getParticularUniversity = () => async (dispatch) => {  
    try {
      const { data } = await api.getParticularUniversity();
      dispatch({ type: GET_PARTICULAR_UNIVERSITY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getParticularInstitute = (params) => async (dispatch) => {  
    try {
      const { data } = await api.getParticularInstitute(params);
      dispatch({ type: GET_PARTICULAR_INSTITUTE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
