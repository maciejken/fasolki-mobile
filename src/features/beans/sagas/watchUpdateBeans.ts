import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { updateSuccess } from "..";
import { fetchBeans, updateBeans } from "../api";
import { selectBeansId } from "../selectors";
import { Beans } from "../types";

export function* onUpdateBeans(action: PayloadAction<number>) {
  try {
    console.log('updating beans...')
    const beansId: string = yield select(selectBeansId);
    yield put({ type: "beans/setStatus", payload: "loading" });
    const beans: Beans = yield call(fetchBeans, beansId);
    const updatedBeans: Beans = yield call(updateBeans, beansId, {
      ...beans,
      amount: beans.amount + action.payload,
      updatedDate: new Date().toISOString(),
    });
    yield put(updateSuccess(updatedBeans));
    yield put({ type: "beans/setStatus", payload: "success" });
    console.log('beans updated!')
  } catch (error) {
    console.log('updating beans failed!')
    yield put({ type: "beans/updateFailed" });
    yield put({ type: "beans/setStatus", payload: "failed" });
  }
}

export default function* watchUpdateBeans() {
  yield takeEvery("beans/updateAmount", onUpdateBeans);
}