import axios from "axios";

export const emailCheck = (formData, setFormData) => {
  
  axios
    .post("http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/v2/api-docs/user/email", formData.email)
    .then(() => {
      alert("사용할 수 있는 이메일입니다.");
    })
    .catch(() => {
      alert("사용할 수 없는 이메일입니다.");
      setFormData({ ...formData, email: "" });
    });
};
