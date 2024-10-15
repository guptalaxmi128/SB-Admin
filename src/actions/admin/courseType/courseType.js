import * as api from "../../../api";
import { ADD_COURSE_TYPE, DELETE_COURSE_TYPE, GET_COURSE_TYPE } from "../../../constants/actionTypes";

export const addCourseType = (coursetype) => async (dispatch) => {
  try {
    const response = await api.addCourseType(coursetype)
    dispatch({ type: ADD_COURSE_TYPE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getCourseType = () => async (dispatch) => {  
    try {
      const { data } = await api.getCourseType();
      dispatch({ type: GET_COURSE_TYPE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteCourseType = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCourseType(id);
      dispatch({ type: DELETE_COURSE_TYPE, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
