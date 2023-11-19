import axios from "axios";
import { setAccessToken } from "../store/userSlice";
// import { login, getToken } from "../store/userSlice";
// import crypto from "crypto";

/*
const JWT_EXPIRE_TIME = 60 * 60 * 1000; // JWT 만료 시간을 1시간으로 설정
export function onLogin(requestBody, dispatch) {
  let newRequestBody = {
    ...requestBody,
    // 비밀번호 암호화 로직
    password: crypto
      .createHash("sha256")
      .update(requestBody.password)
      .digest("hex"),
  };
  axios
    .post("/user/login", newRequestBody)
    .then((res) => {
      console.log(res);
      dispatch(login(res.data)); // 로그인 시 userSlice의 login 리듀서로 res.data에서 이메일, 이름, 닉네임을 넘겨줌
      dispatch(getToken(res.headers.authorization)); // accessToken은 이후 silentRefresh를 위해 리듀서를 분리함
      // 로그인 후 대시보드에서 새로고침 시 onLogin 함수는 이미 실행 완료된 상황이므로 onLoginSuccess 함수 또한 실행되지 않음
      // onLoginSuccess 삭제 -> 내비게이터에서 reissueToken으로 silent Refresh 수행하도록 변경
    })
    .catch((err) => {
      console.log(err);
    });
}

const onSilentRefresh = async () => {
  await axios
    .get("/api/auth/refresh")
    .then((res) => {
      axios.defaults.headers.common["authorization"] =
        res.headers.authorization;
      setTimeout(onSilentRefresh, JWT_EXPIRE_TIME - 10000); // JWT가 만료되기 10초 전에 accessToken을 재발급
    })
    .catch((err) => {
      console.log(err);
    });
};

export const reissueToken = (accessToken) => {
  // 로그인 후 새로고침하면 silentRefresh가 일어나지 않음,
  // -> reissueToken을 네비게이터에서 실행하여 토큰 재발급 실행
  if (accessToken !== null && accessToken.slice(0, 6) === "Bearer") {
    axios.defaults.headers.common["Authorization"] = accessToken;
    onSilentRefresh();
  } else {
    console.log("Access Token not defined");
  }
};
*/

export function onLogin(email, password, dispatch, router) {
  const data = {
    email,
    password,
  };
  axios
    .post(
      "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/user/login",
      data
    )
    .then((res) => {
      const { accessToken } = res.data;
      // 액세스 토큰을 Redux 스토어에 저장
      dispatch(setAccessToken(accessToken));

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // accessToken을 localStorage, cookie 등에 저장하지 않는다!

      router("/frame");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
