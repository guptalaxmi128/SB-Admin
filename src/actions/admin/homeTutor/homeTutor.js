import * as api from "../../../api";
import {
  GET_HOME_TUTOR,
  DELETE_HOME_TUTOR,
  GET_HOME_TUTOR_BY_ID,
  GET_UPDATION_REQUEST,
  HOME_TUTOR_STATUS,
  DELETE_HOME_TUTOR_IMAGE,
  DELETE_HOME_TUTOR_LOCATION,
  DELETE_HOME_TUTOR_SLOT,
  GET_HOME_TUTOR_DATE_SLOT,
  HOME_TUTOR_UPDATION_STATUS
} from "../../../constants/actionTypes";

export const getHomeTutor = () => async (dispatch) => {
  try {
    const { data } = await api.getHomeTutor();
    dispatch({ type: GET_HOME_TUTOR, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteHomeTutor = (id) => async (dispatch) => {
  try {
    const response = await api.deleteHomeTutor(id);
    dispatch({ type: DELETE_HOME_TUTOR, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHomeTutorById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getHomeTutorById(id);
    dispatch({ type: GET_HOME_TUTOR_BY_ID, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUpdationRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUpdationRequest(id);
    dispatch({ type: GET_UPDATION_REQUEST, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const homeTutorStatus = (publish) => async (dispatch) => {
  try {
    const response = await api.homeTutorStatus(publish);
    dispatch({ type: HOME_TUTOR_STATUS, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteHomeTutorLocation = (id) => async (dispatch) => {
  try {
    const response = await api.deleteHomeTutorLocation(id);
    dispatch({ type: DELETE_HOME_TUTOR_LOCATION, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteHomeTutorImage = (id) => async (dispatch) => {
  try {
    const response = await api.deleteHomeTutorImage(id);
    dispatch({ type: DELETE_HOME_TUTOR_IMAGE, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteHomeTutorSlot = (id) => async (dispatch) => {
  try {
    const response = await api.deleteHomeTutorSlot(id);
    dispatch({ type: DELETE_HOME_TUTOR_SLOT, payload: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getHomeTutorDateSlot = (id,date) => async (dispatch) => {
  try {
    const { data } = await api.getHomeTutorDateSlot(id,date);
    dispatch({ type: GET_HOME_TUTOR_DATE_SLOT, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const homeTutorUpdationStatus = (publish) => async (dispatch) => {
  try {
    const response = await api.homeTutorUpdationStatus(publish);
    dispatch({ type: HOME_TUTOR_UPDATION_STATUS, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};