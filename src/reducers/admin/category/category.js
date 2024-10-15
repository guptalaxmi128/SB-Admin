import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  category: [],
  state: "idle",
  error: null,
  success: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
      case actionTypes.DELETE_CATEGORY:
        const categoryIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          category: state.category.data.filter(
            (category) => category.id !== categoryIdToDelete
          ),
        };

    default:
      return state;
  }
};

export default categoryReducer;
