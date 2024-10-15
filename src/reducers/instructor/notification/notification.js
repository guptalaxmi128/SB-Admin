import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  notification: [],
  myNotification:[],
  state: "idle",
  error: null,
  success: null,
};

export const iNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification,
      };
      case actionTypes.GET_INOTIFICATION:
        return {
          ...state,
          notification: action.payload,
        };
        case actionTypes.NOTIFICATION_STATUS:
            return {
              ...state,
              success: action.payload,
              error: null,
            };
            case actionTypes.GET_NOTIFICATION:
                return {
                  ...state,
                  myNotification: action.payload,
                };
 
    default:
      return state;
  }
};

export default iNotificationReducer;
