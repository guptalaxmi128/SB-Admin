import * as api from "../../../api";
import {
  ADD_INOTIFICATION,
  GET_INOTIFICATION,
  GET_NOTIFICATION,
} from "../../../constants/actionTypes";

export const addINotification = (notification) => async (dispatch) => {
  try {
    const response = await api.addINotification(notification);
    dispatch({ type: ADD_INOTIFICATION, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getINotification = () => async (dispatch) => {
  try {
    const { data } = await api.getINotification();
    dispatch({ type: GET_INOTIFICATION, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNotification = (params) => async (dispatch) => {
  try {
    const { data } = await api.getNotification(params);
    dispatch({ type: GET_NOTIFICATION, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
