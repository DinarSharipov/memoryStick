import axios from "../../axios/axios";
import {
  ADD_NEW_WORD,
  FETCH_ALL_WORDS,
  FETCH_START,
  ALL_WORDS_LENGTH,
} from "./actionTypes";

export function fetchAllWordsLength() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/allwords.json");
      const length = Object.keys(response.data).length;
      dispatch({ type: ALL_WORDS_LENGTH, length });
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchAllWords(id) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const AllWords = [];
      const response = await axios.get("/allwords.json");
      const length = Object.keys(response.data).length;

      Object.keys(response.data).forEach((item) => {
        if (AllWords.length == id) {
          return;
        }
        AllWords.push(response.data[item]);
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
