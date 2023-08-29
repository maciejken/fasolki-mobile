import { call, put, select, takeLatest } from "redux-saga/effects";
import { fetchBeans } from "../api";
import { fetchSuccess } from "..";
import { selectBeansId } from "../selectors";
import { Beans } from "../types";

export function* onFetchBeans() {
  try {
    console.log("fetching beans...");
    const beansId: string = yield select(selectBeansId);
    yield put({ type: "beans/setStatus", payload: "loading" });
    const beans: Beans = yield call(fetchBeans, beansId);
    yield put(fetchSuccess(beans));
    yield put({ type: "beans/setStatus", payload: "success" });
    console.log("beans fetched!");
  } catch (error) {
    console.log("error fetching beans!");
    yield put({ type: "beans/fetchFailed" });
    yield put({ type: "beans/setStatus", payload: "failed" });
  }
}

export default function* watchFetchBeans() {
  yield takeLatest("beans/fetch", onFetchBeans);
}
