import * as api from "../../../api";
import {
ADD_COUPON,
GET_COUPON,
DELETE_COUPON,
GET_DELETED_COUPON,
RESTORE_COUPON,
COUPON_STATUS,
COUPON_TO_COURSE
} from "../../../constants/actionTypes";

export const addCoupon = (coupon) => async (dispatch) => {
    try {
      const response = await api.addCoupon(coupon);
      dispatch({ type: ADD_COUPON, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getCoupon = () => async (dispatch) => {  
    try {
      const { data } = await api.getCoupon();
      dispatch({ type: GET_COUPON, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteCoupon = (id) => async (dispatch) => {
    try {
      const response = await api.deleteCoupon(id);
      dispatch({ type: DELETE_COUPON, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getDeletedCoupon = () => async (dispatch) => {
    try {
      const { data } = await api.getDeletedCoupon();
      dispatch({ type: GET_DELETED_COUPON, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const restoreCoupon = (id) => async (dispatch) => {
    try {
      const response = await api.restoreCoupon(id);
      dispatch({ type: RESTORE_COUPON, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const couponStatus = (publish) => async (dispatch) => {
    try {
      const response = await api.couponStatus(publish);
      dispatch({ type: COUPON_STATUS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const couponToCourse = (coupon) => async (dispatch) => {
    try {
      const response = await api.couponToCourse(coupon);
      dispatch({ type: COUPON_TO_COURSE, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
