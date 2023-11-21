import { useState, useEffect } from "react";
import styles from "./FrameList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { getAllFrames } from "../../apis/getFrame";
import { useAtom } from "jotai";
import { accessTokenAtom, setAccessToken } from "../../store/jotaiAtoms";

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      console.log("Framelist ACT:", accessToken); // accessToken jotai에서 잘 불러오는지 확인
      // axios 요청 설정
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
        },
      };
      // API 요청 보내기
      axios
        .get(
          "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/list",
          config
        )
        .then((res) => {
          console.log(res.data);
          // 성공적으로 데이터를 받아온 경우
          setFrames(res.data); // 받아온 데이터로 frames 상태 업데이트
        })
        .catch((err) => {
          // 오류 처리
          console.error("API 요청 중 오류 발생:", err);
        });
    }
  }, [accessToken]); // useEffect가 실행되는 조건을 accessToken이 변경될 때로 설정

  return (
    <div className={styles.FrameList}>
      <Link to="/makeframe">
        <button className={styles.newFrame}>새 프레임 만들기</button>
      </Link>
      <div className={styles.FrameScroll}>
        {frames.length === null ? ( // frames 배열이 비어 있는 경우
          <div className={styles.InfoMsg}>
            <h3>새 프레임을 추가해주세요</h3>
          </div>
        ) : (
          // frames 배열에 프레임이 있는 경우
          <ul className={styles.FrameUl}>
            {frames.map((frame, index) => (
              <li key={frame.id} className={styles.FrameItem}>
                <button>
                  <img
                    key={index}
                    src={frame}
                    alt="frame"
                    className={styles.FrameImage}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FrameList;
