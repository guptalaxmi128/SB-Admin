import * as api from "../../../api";
import { GET_ACOURSE_REVIEW,GET_ACOURSE_AVERAGE_RATING } from "../../../constants/actionTypes";

export const getACourseReview = (id) => async (dispatch) => {
  try {
    const { data } = await api.getACourseReview(id);
    dispatch({ type: GET_ACOURSE_REVIEW, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getACourseAverageRating = (id) => async (dispatch) => {
    try {
      const { data } = await api.getACourseAverageRating(id);
      dispatch({ type: GET_ACOURSE_AVERAGE_RATING, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };