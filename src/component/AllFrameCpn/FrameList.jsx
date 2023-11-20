import { useState, useEffect } from "react";
import styles from "./FrameList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { getAllFrames } from "../../apis/getFrame";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    async function fetchFrames() {
      try {
        const apiURL =
          "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/get/frame";

        // 토큰을 헤더에 추가하여 이미지 리스트 요청
        const res = await axios.get(apiURL, {
          headers: {
            Authorization: accessToken,
          },
        });

        if (res.status === 200) {
          console.log("성공");
          setFrames(res.data); // 가져온 프레임 데이터를 상태에 설정
        } else {
          // 서버에서 오류 응답을 받은 경우에 대한 처리
          throw new Error("Failed to fetch frames");
        }
      } catch (err) {
        console.error("Error fetching frames:", err);
      }
    }

    fetchFrames();
  }, [accessToken]);

  return (
    <div className={styles.FrameList}>
      <Link to="/makeframe">
        <button className={styles.newFrame}>새 프레임 만들기</button>
      </Link>
      <div className={styles.FrameScroll}>
        <ul className={styles.FrameUl}>
          {frames.map((frame, index) => (
            <li key={frame.id} className={styles.FrameItem}>
              <div>
                <img src={frame} alt="frame" className={styles.FrameImage} />
              </div>
              <div>
                <p>프레임 ID: {frame.id}</p>
                <p>프레임 제목: {frame.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FrameList;
