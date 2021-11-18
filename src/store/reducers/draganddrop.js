import { FETCH_DND_APP } from "../actions/actionTypes";

const initialState = {
  images: {},
};

export default function dragAndDropReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DND_APP:
      return {
        ...state,
        images: action.images,
      };
    default:
      return {
        ...state,
      };
  }
}
