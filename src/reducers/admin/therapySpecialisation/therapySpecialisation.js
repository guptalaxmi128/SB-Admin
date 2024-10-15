import * as actionTypes from "../../../constants/actionTypes";

const initialState = {
  specialisation: [],
  state: "idle",
  error: null,
  success: null,
};

export const therapySpecialisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_THERAPY_SPECIALISATION:
      return {
        ...state,
        specialisation: action.payload.specialisation,
      };
    case actionTypes.GET_THERAPY_SPECIALISATION:
      return {
        ...state,
        specialisation: action.payload,
      };
      case actionTypes.DELETE_THERAPY_SPECIALISATION:
        const  specialisationIdToDelete = action.payload;
        // console.log(state.course);
        return {
          ...state,
          specialisation: state.specialisation.data.filter(
            (specialisation) =>  specialisation.id !==  specialisationIdToDelete
          ),
        };

    default:
      return state;
  }
};

export default therapySpecialisationReducer;
