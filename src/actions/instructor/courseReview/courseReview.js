import * as api from "../../../api";
import { GET_ICOURSE_REVIEW,GET_ICOURSE_AVERAGE_RATING } from "../../../constants/actionTypes";

export const getICourseReview = (id) => async (dispatch) => {
  try {
    const { data } = await api.getICourseReview(id);
    dispatch({ type: GET_ICOURSE_REVIEW, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getICourseAverageRating = (id) => async (dispatch) => {
    try {
      const { data } = await api.getICourseAverageRating(id);
      dispatch({ type: GET_ICOURSE_AVERAGE_RATING, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };