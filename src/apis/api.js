import axios from "axios";
import { getCookie } from "../api/cookie";
// axios.create는 나만의 엑시오스 인스턴스를 만드는 메서드
const api = axios.create({
  //baseurl에는 반복되는 url을 넣어즘
  baseURL: "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080",
  //추가로 넣어야하는 옵션들을 넣어주면 되는데, 헤더만 필요하여 헤더를 넣어줌
  headers: { authorization: `Bearer ${getCookie("is_login")}` },
});
export default api;