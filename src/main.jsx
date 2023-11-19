import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";
// import { Provider } from 'jotai';
// import { accessTokenAtom } from './store/jotaiAtoms.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

axios.defaults.baseURL = "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080";
axios.defaults.withCredentials = true;