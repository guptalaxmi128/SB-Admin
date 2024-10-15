import * as api from "../../../api";
import {
  ADD_ANOTIFICATION,
  GET_ANOTIFICATION,
  NOTIFICATION_STATUS
} from "../../../constants/actionTypes";

export const addANotification = (notification) => async (dispatch) => {
  try {
    const response = await api.addANotification(notification);
    dispatch({ type: ADD_ANOTIFICATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getANotification = () => async (dispatch) => {
  try {
    const { data } = await api.getANotification();
    dispatch({ type: GET_ANOTIFICATION, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const notificationStatus = (status) => async (dispatch) => {
    try {
      const { data } = await api.notificationStatus(status);
      dispatch({ type: NOTIFICATION_STATUS, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };