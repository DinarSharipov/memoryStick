import { AUTH_LOGIN, AUTH_REGISTRATION } from "../actions/actionTypes";

const initialState = {
  login: "",
  password: "",
  returnSecureToken: true,
};

export default function authReducers(state = initialState, action) {
  switch (action.type) {
    case AUTH_REGISTRATION:
      return {
        ...state,
        authData: action.data,
      };
    case AUTH_LOGIN:
      return {
        ...state,
        authData: action.data,
      };

    default:
      return {
        ...state,
      };
  }
}
