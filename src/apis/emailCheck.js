import axios from "axios";

export const emailCheck = async (formData, setFormData) => {
  try {
    // 서버에 이메일 중복 체크 요청
    const response = await axios.post(`http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/user/${formData.email}`);
    
    // 응답이 200이면 이메일 중복 없음
    if (response.status === 200) {
      alert("사용할 수 있는 이메일입니다.");
    } else {
      // 다른 상태 코드가 반환된 경우
      alert("사용할 수 없는 이메일입니다.");
      setFormData({ ...formData, email: "" });
    }
  } catch (error) {
    // 오류가 발생한 경우 (401 등)
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.error(error);
  }
};
