import { USER_HAS_TOKEN, USER_AUTH, LOGOUT_USER } from "../actions/types";

const initialState = {
  currentUser: {},
  currentUserAuth: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        currentUser: action.payload
      };
    case USER_HAS_TOKEN:
      return {
        ...state,
        currentUserAuth: action.payload
      };
    case LOGOUT_USER: 
    return {
      ...state,
      currentUserAuth: {}
    }
    default:
      return state;
  }
}
