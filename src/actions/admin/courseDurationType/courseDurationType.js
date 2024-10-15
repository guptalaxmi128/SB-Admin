import * as api from "../../../api";
import { ADD_COURSE_DURATION_TYPE, DELETE_COURSE_DURATION_TYPE, GET_COURSE_DURATION_TYPE } from "../../../constants/actionTypes";

export const addCourseDurationType = (duration) => async (dispatch) => {
  try {
    const response = await api.addCourseDurationType(duration)
    dispatch({ type: ADD_COURSE_DURATION_TYPE, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getCourseDurationType = () => async (dispatch) => {  
    try {
      const { data } = await api.getCourseDurationType();
      dispatch({ type: GET_COURSE_DURATION_TYPE, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteCourseDurationType = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCourseDurationType(id);
      dispatch({ type: DELETE_COURSE_DURATION_TYPE, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
