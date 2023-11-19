import axios from "axios";

export const getAllFrames = async () => {
  try {
    const res = await axios.get(
      "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/find"
    );
    return res.data; // API로부터 받은 데이터 반환
  } catch (err) {
    console.err("Error fetching frames:", err);
    throw err;
  }
};
