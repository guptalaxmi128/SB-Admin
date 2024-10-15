import * as api from "../../../api";
import { ADD_COURSE_DURATION, DELETE_COURSE_DURATION, GET_COURSE_DURATION } from "../../../constants/actionTypes";

export const addCourseDuration = (duration) => async (dispatch) => {
  try {
    const response = await api.addCourseDuration(duration)
    dispatch({ type: ADD_COURSE_DURATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getCourseDuration = () => async (dispatch) => {  
    try {
      const { data } = await api.getCourseDuration();
      dispatch({ type: GET_COURSE_DURATION, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteCourseDuration = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCourseDuration(id);
      dispatch({ type: DELETE_COURSE_DURATION, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
