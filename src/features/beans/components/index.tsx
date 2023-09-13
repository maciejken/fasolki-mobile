import BeansComponent from "./Beans";
import { selectCurrentBeans, selectBeansStatus, selectCurrentBeansUpdatedDate } from "../selectors";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { fetchAllBeans, updateAmount } from "..";
import { Status } from "src/types";
import { Beans } from "../types";

export default function () {
  const dispatch = useAppDispatch();
  const currentBeans: Beans | undefined = useAppSelector(selectCurrentBeans);
  const beansStatus: Status = useAppSelector(selectBeansStatus);
  const beansUpdatedDate: string | undefined = useAppSelector(selectCurrentBeansUpdatedDate);
  return (
    <BeansComponent
      label={currentBeans?.label}
      amount={currentBeans?.amount}
      updatedDate={beansUpdatedDate}
      status={beansStatus}
      fetchAll={() => {
        dispatch(fetchAllBeans());
      }}
      updateAmount={(amount: number) => {
        dispatch(updateAmount(amount));
      }}
    />
  );
}
