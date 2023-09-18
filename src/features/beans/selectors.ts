import { RootState } from "src/app/store";
import { createSelector } from "reselect";
import { Beans, BeansState } from "./types";
import { Status } from "src/types";
import formatDate from "./utils/formatDate";

export const selectBeans = (state: RootState) => state.beans;

export const selectAllBeans = createSelector(
  selectBeans,
  (beans: BeansState): Beans[] =>
    beans.allBeans
      .map((item: Beans) => ({
        ...item,
        updatedDate: formatDate(item.updatedDate),
      }))
      .sort((item1, item2) => (item1.sortIndex || 0) - (item2.sortIndex || 0))
);

export const selectBeansStatus = createSelector(
  selectBeans,
  (beans: BeansState): Status => beans.status
);
