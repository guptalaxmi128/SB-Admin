import * as api from "../../../api";
import { GET_INSTRUCTOR_CATEGORY } from "../../../constants/actionTypes";

export const getInstructorCategory = () => async (dispatch) => {
  try {
    const { data } = await api.getInstructorCategory();
    dispatch({ type: GET_INSTRUCTOR_CATEGORY, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
