import * as actionTypes from "../actions/actions";

const initialstate = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const authreducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCESS:
      return {
        ...state,
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
        return {
            ...state,
            idToken:null,
            userId:null
        }

    default:
      return state;
  }
};

export default authreducer;
