import axios from "axios";
import axiosUrl from "../../axios/axios";
import { AUTH_SUCCESS, AUTH_LOGOUT, ADD_USER_BASE_ID } from "./actionTypes";

export function auth(login, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email: login,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2lEaiEOjRq4fPhDGuoiRM4FKdVwOMKFA";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2lEaiEOjRq4fPhDGuoiRM4FKdVwOMKFA";
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    console.log("Регистрация ", response.data);
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(data.idToken, data.localId));
    dispatch(autoLogout(data.expiresIn));
    console.log(isLogin);
    if (!isLogin) {
      console.log("Запускаем диспатч с id пользователя", data.localId);
      dispatch(newUserData(data.localId));
    } else {
      console.log(
        "Запрашиваем id firebase на данного пользователя ",
        data.localId
      );
      await axios
        .get(
          "https://learn-english-57715-default-rtdb.europe-west1.firebasedatabase.app/learnEnglishApp/users.json"
        )
        .then((res) =>
          Object.keys(res.data).forEach((item, index) => {
            if (res.data[item].userId == data.localId) {
              let userBaseId = Object.keys(res.data)[index];
              // console.log(Object.keys(res.data)[index], data.localId);
              dispatch({ type: ADD_USER_BASE_ID, userBaseId });
            }
          })
        );
    }
  };
}

export function authSuccess(token, userId) {
  return {
    type: AUTH_SUCCESS,
    token,
    userId,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
}

//ДАННАЯ ФУНКЦИЯ ПРОСТО СОЗДАЕТ ТЕСТОВОЕ СЛОВО В СЛОВАРНОМ ЗАПАСЕ НОВОГО ПОЛЬЗОВАТЕЛЯ И ЗАПИСЫВАЕТ В СТОР УНИКАЛЬНЫЙ ID FIREBASE
export function newUserData(idToken) {
  return async (dispatch) => {
    let userBaseId = {};
    try {
      await axios({
        method: "POST",
        url: "https://learn-english-57715-default-rtdb.europe-west1.firebasedatabase.app/learnEnglishApp/users.json",
        data: {
          name: "test",
          userId: idToken,
          words: {
            id: {
              eng: "Hello",
              rus: "Привет",
              lastAnswer: "-",
              statistics: {
                true: 0,
                false: 0,
              },
            },
          },
        },
      }).then((res) => {
        userBaseId = res.data.name;
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Ответ: ", userBaseId);
    return dispatch({ type: ADD_USER_BASE_ID, userBaseId });
  };
}
