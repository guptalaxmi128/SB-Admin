import * as api from "../../../api";
import {
GET_AREVIEW,
DELETE_AREVIEW,
GET_AAVERAGE_RATING
} from "../../../constants/actionTypes";



export const getAReview = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAReview(id);
    dispatch({ type: GET_AREVIEW, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAReview = (id) => async (dispatch) => {
    try {
      const response = await api.deleteAReview(id);
      dispatch({ type: DELETE_AREVIEW, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  
export const getAAverageRating = (id) => async (dispatch) => {
    try {
      const { data } = await api.getAAverageRating(id);
      dispatch({ type: GET_AAVERAGE_RATING, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };