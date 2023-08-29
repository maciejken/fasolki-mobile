import { RootState } from "src/app/store";
import { createSelector } from "reselect";
import { BeansState } from "./types";

export const selectBeans = (state: RootState) => state.beans;

export const selectBeansAmount = createSelector(
  selectBeans,
  (beans: BeansState) => beans.amount
);
export const selectBeansId = createSelector(
  selectBeans,
  (beans: BeansState) => beans.id
);
export const selectBeansLabel = createSelector(
  selectBeans,
  (beans: BeansState) => beans.label
);
export const selectBeansStatus = createSelector(
  selectBeans,
  (beans: BeansState) => beans.status
);
