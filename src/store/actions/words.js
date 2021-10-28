import axios from "../../axios/axios";
import { FETCH_ALL_WORDS, FETCH_START } from "./actionTypes";

export function fetchAllWords(id) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const response = await axios.get("/allwords.json");
      console.log(id);
      const AllWords = [];

      response.data.forEach((item) => {
        AllWords.push(item);
      });

      dispatch(fetchWordsSuccess(AllWords));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchWordsSuccess(AllWords) {
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
