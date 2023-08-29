import { combineReducers } from "redux";
import beansReducer from "../features/beans";

const rootReducer = combineReducers({
  beans: beansReducer,
});

export default rootReducer;