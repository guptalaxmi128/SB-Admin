import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  notification: [],
  state: "idle",
  error: null,
  success: null,
};

export const aNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ANOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification,
      };
      case actionTypes.GET_ANOTIFICATION:
        return {
          ...state,
          notification: action.payload,
        };
 
    default:
      return state;
  }
};

export default aNotificationReducer;
