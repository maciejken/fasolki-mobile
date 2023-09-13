import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchAllBeans } from "../api";
import { fetchAllSuccess } from "..";
import { Beans } from "../types";

export function* onFetchAllBeans() {
  try {
    console.log("fetching beans...");
    yield put({ type: "beans/setStatus", payload: "loading" });
    const allBeans: Beans[] = yield call(fetchAllBeans);
    yield put(fetchAllSuccess(allBeans));
    yield put({ type: "beans/setStatus", payload: "success" });
    console.log("beans fetched!");
  } catch (error) {
    console.log("error fetching beans!");
    yield put({ type: "beans/fetchAllFailed" });
    yield put({ type: "beans/setStatus", payload: "failed" });
  }
}

export default function* watchFetchBeans() {
  yield takeLatest("beans/fetchAll", onFetchAllBeans);
}