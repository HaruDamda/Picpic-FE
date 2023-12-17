import axios from "axios";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../store/jotaiAtoms";

const { VITE_APP_SERVER_PORT } = import.meta.env;

const useAxios = () => {
  const [accessToken, ] = useAtom(accessTokenAtom);

  const instance = axios.create({
    baseURL: VITE_APP_SERVER_PORT,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  
  return instance;
};

export default useAxios;
