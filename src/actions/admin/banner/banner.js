
import * as api from "../../../api";
import { ADD_BANNER, DELETE_BANNER, GET_BANNER } from "../../../constants/actionTypes";

export const addBanner = (banner) => async (dispatch) => {
    try {
        const { data } = await api.addBanner(banner);
        dispatch({ type: ADD_BANNER, payload: data });
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getBanner = () => async (dispatch) => {
    try {
        const { data } = await api.getBanner();
        dispatch({ type: GET_BANNER, payload: data });
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}


  export const deleteBanner = (id) => async (dispatch) => {
    try {
      const response = await api.deleteBanner(id);
      dispatch({ type: DELETE_BANNER, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };