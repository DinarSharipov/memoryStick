import { combineReducers } from "redux";
import wordsReducer from "./words";
import appListReducer from "./appList";
import authReducers from "./auth";
import dragAndDropReducer from "./draganddrop";

export default combineReducers({
  words: wordsReducer,
  applist: appListReducer,
  auth: authReducers,
  dragAndDrop: dragAndDropReducer,
});
