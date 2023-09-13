import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchBeans, updateBeans } from "../api";
import { Beans } from "../types";
import { selectCurrentBeans } from "../selectors";

export function* onUpdateBeans(action: PayloadAction<number>) {
  try {
    console.log('updating beans...');
    const currentBeans: Beans | undefined = yield select(selectCurrentBeans);
    if (currentBeans) {
      yield put({ type: "beans/setStatus", payload: "loading" });
      const beans: Beans = yield call(fetchBeans, currentBeans.id);
      if (currentBeans.amount !== beans.amount) {
        throw new Error(`Wartość (amount: ${currentBeans.amount}) dokumentu '${currentBeans.id}' jest nieaktualna!`);
      }
      yield call(updateBeans, currentBeans.id, {
        amount: currentBeans.amount + action.payload,
        updatedDate: new Date().toISOString(),
      });
      yield put({ type: "beans/fetchAll" });
    }
    console.log('beans updated!')
  } catch (error) {
    yield put({ type: "beans/setStatus", payload: "failed" });
  }
}

export default function* watchUpdateBeans() {
  yield takeEvery("beans/updateAmount", onUpdateBeans);
}