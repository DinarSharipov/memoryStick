import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  ADD_USER_BASE_ID,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  userBaseId: null,
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        userBaseId: null,
      };
    case ADD_USER_BASE_ID:
      return {
        ...state,
        userBaseId: action.userBaseId,
      };

    default:
      return state;
  }
}
