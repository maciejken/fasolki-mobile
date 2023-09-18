import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { fetchBeans, updateBeans } from "../api";
import { Beans, BeansUpdate } from "../types";
import { selectAllBeans } from "../selectors";

export function* onUpdateBeans(action: PayloadAction<BeansUpdate>) {
  const { id, amount } = action.payload;
  try {
    console.log("updating beans...");
    yield put({ type: "beans/setStatus", payload: "loading" });
    const allBeans: Beans[] = yield select(selectAllBeans);
    const currentAmount: number | undefined = allBeans?.find((item: Beans) => item.id === id)?.amount;
    const beans: Beans = yield call(fetchBeans, id);

    if (currentAmount && currentAmount !== beans.amount) {
      throw new Error(
        `Wartość (amount: ${amount}) dokumentu '${id}' jest nieaktualna!`
      );
    }

    yield call(updateBeans, id, {
      amount: beans.amount + amount,
      updatedDate: new Date().toISOString(),
    });
    
    console.log("beans updated!");
    yield put({ type: "beans/fetchAll" });
  } catch (error) {
    yield put({ type: "beans/setStatus", payload: "failed" });
    console.log("update failed!")
  }
}

export default function* watchUpdateBeans() {
  yield takeEvery("beans/updateAmount", onUpdateBeans);
}
