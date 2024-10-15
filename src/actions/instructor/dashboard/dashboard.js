import * as api from "../../../api";
import { GET_INSTRUCTOR_TOTAL_COURSES ,GET_INSTRUCTOR_DRAFT_COURSES,GET_INSTRUCTOR_ONGOING_COURSES,GET_INSTRUCTOR_STUDENT} from "../../../constants/actionTypes";

export const getInstructorTotalCourses = () => async (dispatch) => {
  try {
    const { data } = await api.getInstructorTotalCourses();
    dispatch({ type: GET_INSTRUCTOR_TOTAL_COURSES, payload: data });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getInstructorDraftCourses = () => async (dispatch) => {
    try {
      const { data } = await api.getInstructorDraftCourses();
      dispatch({ type: GET_INSTRUCTOR_DRAFT_COURSES, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getInstructorOngoingCourses = () => async (dispatch) => {
    try {
      const { data } = await api.getInstructorOngoingCourses();
      dispatch({ type: GET_INSTRUCTOR_ONGOING_COURSES, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getInstructorStudent = () => async (dispatch) => {
    try {
      const { data } = await api.getInstructorStudent();
      dispatch({ type: GET_INSTRUCTOR_STUDENT, payload: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  