import * as api from "../../../api";
import {  LOGIN_ADMIN } from "../../../constants/actionTypes";

export const loginAdmin = (userInfo) => async (dispatch) => {
    try {
        const { data } = await api.loginAdmin(userInfo);
        dispatch({ type: LOGIN_ADMIN, payload: data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};