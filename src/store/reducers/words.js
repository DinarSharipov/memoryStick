import {
  ADD_NEW_WORD,
  FETCH_ALL_WORDS,
  FETCH_START,
  ALL_WORDS_LENGTH,
  DELETE_WORD,
} from "../actions/actionTypes";

const initialState = {
  modeList: [
    { name: "3 слова", id: 3 },
    { name: "5 слов", id: 5 },
    { name: "10 слов", id: 10 },
    { name: "20 слов", id: 20 },
    { name: "30 слов", id: 30 },
    { name: "50 слов", id: 50 },
  ],
  AllWords: [],
  length: 0,
  loading: false,
  wordsList: "",
};

export default function wordsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_WORDS:
      return {
        ...state,
        AllWords: action.AllWords,
        loading: false,
      };
    case FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_WORD:
      return {
        ...state,
      };
    case ALL_WORDS_LENGTH:
      return {
        ...state,
        length: action.length,
        wordsList: action.wordsList,
      };

    case DELETE_WORD:
      return {
        ...state,
      };

    default:
      return state;
      break;
  }
}
