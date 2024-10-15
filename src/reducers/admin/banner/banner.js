import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
    banner: [],
  state: "idle",
  error: null,
  success: null,
};

export const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BANNER:
      return {
        ...state,
        banner: action.payload.banner,
      };
    case actionTypes.GET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };
      case actionTypes.DELETE_BANNER:
        const bannerIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          banner: state.banner.data.filter(
            (banner) => banner.id !== bannerIdToDelete
          ),
        };

    default:
      return state;
  }
};

export default bannerReducer;
