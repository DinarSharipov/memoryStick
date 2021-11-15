import {
  FETCH_ALL_WORDS,
  FETCH_START,
  DELETE_WORD,
  SET_USER_BASE,
} from "../actions/actionTypes";

const initialState = {
  modeList: [
    { name: "3 слова", modeLength: 3 },
    { name: "5 слов", modeLength: 5 },
    { name: "10 слов", modeLength: 10 },
    { name: "20 слов", modeLength: 20 },
    { name: "30 слов", modeLength: 30 },
    { name: "50 слов", modeLength: 50 },
  ],

  loading: false,
  userBase: null,
};

export default function wordsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_BASE:
      return {
        ...state,
        userBase: action.userBase,
      };
    case FETCH_ALL_WORDS:
      return {
        ...state,
        userWords: action.userWords,
        loading: false,
      };
    case FETCH_START:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
