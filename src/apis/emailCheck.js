import axios from "axios";

export const emailCheck = (formData, setFormData) => {
  axios
    .post("api/users/idcheck", { email: formData.email })
    .then(() => {
      alert("사용할 수 있는 이메일입니다.");
    })
    .catch(() => {
      alert("사용할 수 없는 이메일입니다.");
      setFormData({ ...formData, email: "" });
    });
};
