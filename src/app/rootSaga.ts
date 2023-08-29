import { all } from "redux-saga/effects";
import watchFetchBeans from "../features/beans/sagas/watchFetchBeans";
import watchUpdateBeans from "../features/beans/sagas/watchUpdateBeans";

// Create rootSaga to combine all sagas
function* rootSaga() {
  yield all([
    // Add your sagas here
    watchFetchBeans(),
    watchUpdateBeans(),
  ]);
}

export default rootSaga;
