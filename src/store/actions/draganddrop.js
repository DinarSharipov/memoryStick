import axios from "axios";
import { FETCH_DND_APP } from "./actionTypes";

export function fetchDragAndDropApp() {
  return async (dispatch) => {
    const response = await axios.get(
      "https://learn-english-57715-default-rtdb.europe-west1.firebasedatabase.app/drag&dropApp/imagesbase/.json"
    );
    let images = response.data;
    dispatch({ type: FETCH_DND_APP, images });
  };
}
