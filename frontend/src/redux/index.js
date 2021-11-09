import { createStore, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import Thunk from "redux-thunk";
import rootReducer from "./reducers";
import createTransform from "redux-persist/es/createTransform";

const blackListTransform = createTransform(
  (state) => {
    const { error, ...newState } = state;
    return newState;
  },
  (state) => {
    const { error, ...newState } = state;
    return newState;
  },
  { whitelist: ["user"] }
);
const persistConfig = {
  key: "root",
  storage,
  transforms: [blackListTransform],
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(Thunk))
);
export const persistor = persistStore(store);
