import axios from "../../axios/axios";
import {
  ADD_NEW_WORD,
  FETCH_ALL_WORDS,
  FETCH_START,
  DELETE_WORD,
  SET_USER_BASE,
} from "./actionTypes";

//ЗАПРОС СЛОВАРНОГО ЗАПАСА КОНКРЕТНОГО ПОЛЬЗОВАТЕЛЯ
export function fetchLearnEnglichApp(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get("/learnEnglishApp.json");
      const base = response.data;

      Object.keys(base.users).forEach((item) => {
        let user = base.users[item];
        if (user.userId === userId) {
          console.log(user);
          dispatch({
            type: SET_USER_BASE,
            userBase: user,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
}

//ДОБАВЛЕНИЕ НОВОГО СЛОВА В СЛОВАРНЫЙ ЗАПАС ПОЛЬЗОВАТЕЛЯ
export function addNewWord(newWord, userBaseId) {
  return async () => {
    try {
      console.log(userBaseId);
      const response = await axios.post(
        `/learnEnglishApp/users/${userBaseId}/words/.json`,
        newWord
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

//УДАЛЕНИЕ СЛОВА ИЗ СЛОВАРНОГО ЗАПАСА ПОЛЬЗОВАТЕЛЯ
export function deleteWord(id) {
  return async () => {
    try {
      await axios.delete(`/allwords/${id}.json`);
    } catch (error) {
      console.log(error);
    }
  };
}

//ОТПРАВКА РЕЗУЛЬТАТОВ ИГРЫ В БАЗУ ДАННЫХ
export function pushResults(results, userBaseId) {
  console.log(results);
  return async () => {
    try {
      await results.forEach((word) => {
        let newword = {
          eng: word.engWord,
          rus: word.rusWord,
          lastAnswer: word.trueFalse,
          statistics: word.statistics,
        };
        const response = axios.put(
          `/learnEnglishApp/users/${userBaseId}/words/${word.id}.json`,
          newword
        );
        console.log(word);
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Диспатч ретернеры===================================

export function fetchWordsSuccess(AllWords, length) {
  return {
    type: FETCH_ALL_WORDS,
    AllWords,
  };
}

export function fetchStart() {
  return {
    type: FETCH_START,
  };
}

export function pushWord() {
  return {
    type: ADD_NEW_WORD,
  };
}
