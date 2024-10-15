import * as api from "../../../api";
import { GET_YOGA_STUDIO,YOGA_STUDIO_STATUS } from "../../../constants/actionTypes";

export const getYogaStudio = () => async (dispatch) => {  
    try {
      const { data } = await api.getYogaStudio();
      dispatch({ type: GET_YOGA_STUDIO, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  
  export const yogaStudioStatus = (publish) => async (dispatch) => {
    try {
      const response = await api.yogaStudioStatus(publish);
      dispatch({ type: YOGA_STUDIO_STATUS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };