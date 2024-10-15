import * as api from "../../../api";
import {
ADD_INSTRUCTOR_COUPON,
GET_INSTRUCTOR_COUPON,
DELETE_INSTRUCTOR_COUPON,
ADD_COUPON_TO_COURSE
} from "../../../constants/actionTypes";

export const addInstructorCoupon = (coupon) => async (dispatch) => {
    try {
      const response = await api.addInstructorCoupon(coupon);
      dispatch({ type: ADD_INSTRUCTOR_COUPON, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getInstructorCoupon = (params) => async (dispatch) => {  
    try {
      const { data } = await api.getInstructorCoupon(params);
      dispatch({ type: GET_INSTRUCTOR_COUPON, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const deleteInstructorCoupon = (id) => async (dispatch) => {
    try {
      const response = await api.deleteInstructorCoupon(id);
      dispatch({ type: DELETE_INSTRUCTOR_COUPON, payload: id });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const addCouponToCourse = (coupon) => async (dispatch) => {
    try {
      const response = await api.addCouponToCourse(coupon);
      dispatch({ type: ADD_COUPON_TO_COURSE, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  