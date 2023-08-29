import { useSelector } from "react-redux";
import Beans from "./Beans";
import { selectBeansAmount, selectBeansStatus } from "../selectors";
import { useAppDispatch } from "src/app/hooks";
import { fetchBeans } from "..";

export default function() {
    const dispatch = useAppDispatch();
    const beansAmount = useSelector(selectBeansAmount);
    const beansStatus = useSelector(selectBeansStatus);
    return <Beans amount={beansAmount} status={beansStatus} fetchBeans={() => { dispatch(fetchBeans())}}/>
}