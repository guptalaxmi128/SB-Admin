import * as api from "../../../api";
import {
GET_IREVIEW,
DELETE_IREVIEW,
GET_IAVERAGE_RATING
} from "../../../constants/actionTypes";



export const getIReview = (params) => async (dispatch) => {
  try {
    const { data } = await api.getIReview(params);
    dispatch({ type: GET_IREVIEW, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteIReview = (id) => async (dispatch) => {
    try {
      const response = await api.deleteIReview(id);
      dispatch({ type: DELETE_IREVIEW, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getIAverageRating = () => async (dispatch) => {
    try {
      const { data } = await api.getIAverageRating();
      dispatch({ type: GET_IAVERAGE_RATING, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };