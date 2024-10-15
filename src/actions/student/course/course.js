import * as api from "../../../api";
import {
  APPLY_COUPON_COURSE,
GET_COURSE,
GET_SCOURSE
} from "../../../constants/actionTypes";

export const getCourse = () => async (dispatch) => {
  try {
    const res = await api.getCourse();
    dispatch({ type: GET_COURSE, payload: res.data });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSCourse = (id) => async (dispatch) => {
    try {
      const res = await api.getSCourse(id);
      dispatch({ type: GET_SCOURSE, payload: res.data });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const applyCouponCourse = (coupon) => async (dispatch) => {
    try {
      const response = await api.applyCouponCourse(coupon);
      dispatch({ type: APPLY_COUPON_COURSE, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
