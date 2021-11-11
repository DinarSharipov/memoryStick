import axios from "../../axios/axios";
import {
  ADD_NEW_WORD,
  FETCH_ALL_WORDS,
  FETCH_START,
  ALL_WORDS_LENGTH,
  DELETE_WORD,
} from "./actionTypes";

export function fetchAllWordsLength() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/allwords.json");
      const wordsList = response.data;
      const length = Object.keys(response.data).length;
      dispatch({
        type: ALL_WORDS_LENGTH,
        length: length,
        wordsList: wordsList,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchModeWords(id) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const AllWords = [];
      const response = await axios.get("/allwords.json");
      const length = Object.keys(response.data).length;

      // for (let [key, value] of Object.entries(response.data)) {
      //   if (AllWords.length === id) {
      //     break;
      //   } else if (key === "AppInfo") {
      //     continue;
      //   } else {
      //     AllWords.push(Object.assign(value, { id: key }));
      //   }
      // }

      Object.keys(response.data).forEach((item, i) => {
        if (AllWords.length == id) {
          return;
        }
        console.log(item);

        AllWords.push(Object.assign(response.data[item], { id: item }));
      });
      dispatch(fetchWordsSuccess(AllWords, length));
    } catch (e) {
      console.log(e);
    }
  };
}

export function addNewWord(newWord) {
  return async () => {
    try {
      const response = await axios.post("/allwords.json", newWord);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteWord(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`/allwords/${id}.json`);
      dispatch({ type: DELETE_WORD });
    } catch (error) {
      console.log(error);
    }
  };
}

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

export function pushResults(results) {
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
        const response = axios.put(`/allwords/${word.id}/.json`, newword);
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
