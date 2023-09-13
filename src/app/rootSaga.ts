import { all } from "redux-saga/effects";
import watchFetchAllBeans from "../features/beans/sagas/watchFetchAllBeans";
import watchUpdateBeans from "../features/beans/sagas/watchUpdateBeans";

// Create rootSaga to combine all sagas
function* rootSaga() {
  yield all([
    // Add your sagas here
    watchFetchAllBeans(),
    watchUpdateBeans(),
  ]);
}

export default rootSaga;
