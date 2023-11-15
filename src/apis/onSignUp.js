import axios from "axios";
// import sha256 from "crypto-js/sha256";

export const onSignUp = (userInfo, router) => {
  // let newUserInfo = {
  //   ...userInfo,
  //   // 비밀번호 암호화 로직
  //   password: sha256(userInfo.password).toString(),
  // };
  axios
    .post(
      "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/user/join",
      userInfo
    )
    .then((res) => {
      console.log(res.data);
      router("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
