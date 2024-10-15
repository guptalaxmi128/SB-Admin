import * as api from "../../../api";
import { ADD_THERAPY_SPECIALISATION,GET_THERAPY_SPECIALISATION,DELETE_THERAPY_SPECIALISATION } from "../../../constants/actionTypes";

export const addTherapySpecialisation = (therapy) => async (dispatch) => {
  try {
    const response = await api.addTherapySpecialisation(therapy)
    dispatch({ type: ADD_THERAPY_SPECIALISATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getTherapySpecialisation = () => async (dispatch) => {  
    try {
      const { data } = await api.getTherapySpecialisation();
      dispatch({ type: GET_THERAPY_SPECIALISATION, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteTherapySpecialisation = (id) => async (dispatch) => {
    try {
      const response = await api.deleteTherapySpecialisation(id);
      dispatch({ type: DELETE_THERAPY_SPECIALISATION, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
