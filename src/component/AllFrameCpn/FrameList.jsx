import React, { useState, useEffect, useSelector } from "react";
import styles from "./FrameList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import { getAllFrames } from "../../apis/getFrame";

const FrameList = () => {
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    async function fetchFrames() {
      try {
        const apiURL =
          "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/get/frame";

        const res = await axios.get(apiURL);

        if (res.status === 200) {
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
  }, []);

  return (
    <div className={styles.FrameList}>
      <Link to="/makeframe">
        <button className={styles.newFrame}>새 프레임 만들기</button>
      </Link>
      <div className={styles.FrameScroll}>
        <ul className={styles.FrameUl}>
          {frames.map((frame, index) => (
            <li key={frame.id} className={styles.FrameItem}>
              {/* 각 프레임 정보를 두 줄씩 나열 */}
              <div>
                <img src={frame} alt="frame" className={styles.FrameImage} />
              </div>
              <div>
                <p>프레임 ID: {frame.id}</p>
                <p>프레임 제목: {frame.title}</p>
                {/* 원하는 다른 프레임 정보를 보여줄 수 있음 */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FrameList;
