import { useSelector } from "react-redux";
import Beans from "./Beans";
import { selectBeansAmount, selectBeansStatus, selectBeansUpdatedDate } from "../selectors";
import { useAppDispatch } from "src/app/hooks";
import { fetchBeans, updateAmount } from "..";

export default function () {
  const dispatch = useAppDispatch();
  const beansAmount = useSelector(selectBeansAmount);
  const beansStatus = useSelector(selectBeansStatus);
  const beansUpdatedDate = useSelector(selectBeansUpdatedDate);
  return (
    <Beans
      amount={beansAmount}
      updatedDate={beansUpdatedDate}
      status={beansStatus}
      fetchBeans={() => {
        dispatch(fetchBeans());
      }}
      updateAmount={(amount: number) => {
        dispatch(updateAmount(amount));
      }}
    />
  );
}
