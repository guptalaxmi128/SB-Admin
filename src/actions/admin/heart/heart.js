import * as api from "../../../api";
import { GET_HEART } from "../../../constants/actionTypes";




export const getHeart = () => async (dispatch) => {  
    try {
      const { data } = await api.getHeart();
      dispatch({ type: GET_HEART, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };