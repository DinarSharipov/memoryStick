import axios from "../../axios/axios";
import { FETCH_APPLIST } from "./actionTypes";

export function fetchAppList() {
  return async (dispatch) => {
    let apps = [];
    const response = await axios.get(".json").then((res) => {
      Object.keys(res.data).forEach((item) => {
        apps.push(Object.assign(res.data[item].AppInfo, { url: item }));
      });
    });
    dispatch({ type: FETCH_APPLIST, apps });
  };
}
