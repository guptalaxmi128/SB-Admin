import * as api from "../../../api";
import { ADD_PAYMENT } from "../../../constants/actionTypes";

export const addPayment  = (paymentInfo) => async (dispatch) => {
  try {
    const { data } = await api.addPayment(paymentInfo);
    dispatch({ type:ADD_PAYMENT , payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error
  }
};