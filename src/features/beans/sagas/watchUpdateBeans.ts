import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchBeans, updateBeans } from "../api";
import { Beans } from "../types";
import { selectCurrentBeans } from "../selectors";

export function* onUpdateBeans(action: PayloadAction<number>) {
  try {
    const currentBeans: Beans | undefined = yield select(selectCurrentBeans);
    if (currentBeans) {
      console.log('updating beans...');
      yield put({ type: "beans/setStatus", payload: "loading" });
      const beans: Beans = yield call(fetchBeans, currentBeans.id);
      if (currentBeans.amount !== beans.amount) {
        throw new Error(`Wartość (amount: ${currentBeans.amount}) dokumentu '${currentBeans.id}' jest nieaktualna!`);
      }
      yield call(updateBeans, currentBeans.id, {
        amount: currentBeans.amount + action.payload,
        updatedDate: new Date().toISOString(),
      });
      console.log('beans updated!')
      yield put({ type: "beans/fetchAll" });
    } else {
      throw new Error(`Nie mozna zaktualizować: brak dokumentu!`);
    }
  } catch (error) {
    yield put({ type: "beans/setStatus", payload: "failed" });
  }
}

export default function* watchUpdateBeans() {
  yield takeEvery("beans/updateAmount", onUpdateBeans);
}