import axios from "axios";

const { VITE_APP_SERVER_PORT } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_APP_SERVER_PORT,
  withCredentials: true
});

export default instance;
