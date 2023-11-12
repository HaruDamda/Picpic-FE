import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

axios.defaults.baseURL = "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080";
axios.defaults.withCredentials = true;