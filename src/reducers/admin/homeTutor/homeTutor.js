import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  homeTutor: [],
  request:[],
  slot:[],
  photo:[],
  location:[],
  state: "idle",
  error: null,
  success: null,
};

export const homeTutorReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case actionTypes.GET_HOME_TUTOR:
      return {
        ...state,
        homeTutor: action.payload,
      };
      case actionTypes.GET_UPDATION_REQUEST:
        return {
          ...state,
          request: action.payload,
        };
        case actionTypes.GET_HOME_TUTOR_DATE_SLOT:
          return {
            ...state,
            slot: action.payload,
          };
        case actionTypes.HOME_TUTOR_STATUS:
          case actionTypes.HOME_TUTOR_UPDATION_STATUS:
          return {
            ...state,
            success: action.payload,
            error: null,
          };
      case actionTypes.DELETE_HOME_TUTOR:
        const homeTutorToDelete = action.payload;
          return {
            ...state,
            homeTutor: Array.isArray(state.homeTutor)
              ? state.homeTutor.filter(
                  (homeTutor) => homeTutor.id !== homeTutorToDelete
                )
              : [],
          };
          case actionTypes.DELETE_HOME_TUTOR_LOCATION:
            const locationIdToDelete = action.payload;
            return {
              ...state,
              location: Array.isArray(state.location)
                ? state.location.filter(
                    (location) => location.id !== locationIdToDelete
                  )
                : [],
            };
            case actionTypes.DELETE_HOME_TUTOR_IMAGE:
              const imageIdToDelete = action.payload;
              return {
                ...state,
                photo: Array.isArray(state.photo)
                  ? state.photo.filter(
                      (photo) => photo.id !== imageIdToDelete
                    )
                  : [],
              };
              case actionTypes.DELETE_HOME_TUTOR_SLOT:
                const slotIdToDelete = action.payload;
                return {
                  ...state,
                  slot: Array.isArray(state.slot)
                    ? state.slot.filter(
                        (slot) => slot.id !== slotIdToDelete
                      )
                    : [],
                };

    default:
      return state;
  }
};

export default homeTutorReducer;
