import React from "react";
import "./App.scss";

import { Provider } from "react-redux";

import { store, persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

import Start from "./start";
import { BrowserRouter } from "react-router-dom";

function App({ props }) {
  // console.log(process.env);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Start />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
