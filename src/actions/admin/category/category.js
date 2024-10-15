import * as api from "../../../api";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from "../../../constants/actionTypes";

export const addCategory = (category) => async (dispatch) => {
  try {
    const response = await api.addCategory(category);
    dispatch({ type: ADD_CATEGORY, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getCategory = () => async (dispatch) => {  
    try {
      const { data } = await api.getCategory();
      dispatch({ type: GET_CATEGORY, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteCategory = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCategory(id);
      dispatch({ type: DELETE_CATEGORY, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
