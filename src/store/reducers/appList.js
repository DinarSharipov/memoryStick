import { FETCH_APPLIST } from "../actions/actionTypes";

const initialState = {
  apps: [],
};

export default function appListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPLIST:
      return {
        ...state,
        apps: action.apps,
      };
    default:
      return state;
  }
}
