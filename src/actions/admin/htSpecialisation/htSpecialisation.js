import * as api from "../../../api";
import {  ADD_HT_SPECIALISATION, DELETE_HT_SPECIALISATION, GET_HT_SPECIALISATION } from "../../../constants/actionTypes";

export const addHTSpecialisation = (specialisation) => async (dispatch) => {
  try {
    const response = await api.addHTSpecialisation(specialisation)
    dispatch({ type: ADD_HT_SPECIALISATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getHTSpecialisation = () => async (dispatch) => {  
    try {
      const { data } = await api.getHTSpecialisation();
      dispatch({ type: GET_HT_SPECIALISATION, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteHTSpecialisation = (id) => async (dispatch) => {
    try {
      const response = await api.deleteHTSpecialisation(id);
      dispatch({ type: DELETE_HT_SPECIALISATION, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
