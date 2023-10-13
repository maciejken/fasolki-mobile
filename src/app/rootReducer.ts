import { combineReducers } from "redux";
import beans from "src/features/beans";
import settings from "src/features/settings";

const rootReducer = combineReducers({
  beans,
  settings,
});

export default rootReducer;