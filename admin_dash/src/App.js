import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Layout/Wrapper";
import { Provider } from "react-redux";
import { persistor, store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Wrapper />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
