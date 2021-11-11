import axios from "axios";
import { AUTH_LOGIN, AUTH_REGISTRATION } from "./actionTypes";

export function authRegistration(login, password) {
  return async (dispatch) => {
    const data = {
      email: login,
      password: password,
      returnSecureToken: true,
    };
    console.log(1);
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2lEaiEOjRq4fPhDGuoiRM4FKdVwOMKFA",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    return dispatch({ type: "AUTH_REGISTRATION", data });
  };
}
export function authLogin(login, password) {
  return async (dispatch) => {
    const data = {
      email: login,
      password: password,
      returnSecureToken: true,
    };
    console.log(1);
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2lEaiEOjRq4fPhDGuoiRM4FKdVwOMKFA",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    return dispatch({ type: "AUTH_LOGIN", data });
  };
}
