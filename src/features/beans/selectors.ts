import { RootState } from "src/app/store";
import { createSelector } from "reselect";
import { BeansState } from "./types";
import { Status } from "src/types";

export const selectBeans = (state: RootState) => state.beans;

export const selectBeansAmount = createSelector(
  selectBeans,
  (beans: BeansState): number => beans.amount
);
export const selectBeansId = createSelector(
  selectBeans,
  (beans: BeansState): string | undefined => beans.id
);
export const selectBeansLabel = createSelector(
  selectBeans,
  (beans: BeansState): string | undefined => beans.label
);
export const selectBeansStatus = createSelector(
  selectBeans,
  (beans: BeansState): Status => beans.status
);

export const selectBeansUpdatedDate = createSelector(
  selectBeans,
  (beans: BeansState): string | undefined =>
    beans.updatedDate && Intl.DateTimeFormat('pl-PL', {
      weekday: 'long',
      year: '2-digit',
      month: '2-digit',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(beans.updatedDate))
);
