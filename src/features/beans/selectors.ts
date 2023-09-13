import { RootState } from "src/app/store";
import { createSelector } from "reselect";
import { Beans, BeansState } from "./types";
import { Status } from "src/types";

export const selectBeans = (state: RootState) => state.beans;

export const selectAllBeans = createSelector(
  selectBeans,
  (beans: BeansState): Beans[] => beans.allBeans
);
export const selectCurrentBeansId = createSelector(
  selectBeans,
  (beans: BeansState): string | undefined => beans.currentBeansId
);
export const selectCurrentBeans = createSelector(
  selectAllBeans,
  selectCurrentBeansId,
  (allBeans: Beans[], currentBeansId: string | undefined): Beans | undefined => {
    if (currentBeansId) {
      return allBeans.find((beans: Beans) => beans.id === currentBeansId);
    }
  }
);
export const selectCurrentBeansAmount = createSelector(
  selectCurrentBeans,
  (beans: Beans | undefined): number | undefined => beans?.amount
);
export const selectCurrentBeansLabel = createSelector(
  selectCurrentBeans,
  (beans: Beans | undefined): string | undefined => beans?.label
);
export const selectBeansStatus = createSelector(
  selectBeans,
  (beans: BeansState): Status => beans.status
);

export const selectCurrentBeansUpdatedDate = createSelector(
  selectCurrentBeans,
  (beans: Beans | undefined): string | undefined =>
    beans?.updatedDate && Intl.DateTimeFormat('pl-PL', {
      weekday: 'long',
      year: '2-digit',
      month: '2-digit',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(beans.updatedDate))
);
