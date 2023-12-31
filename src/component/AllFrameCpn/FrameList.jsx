import { useState, useEffect } from "react";
import styles from "./FrameList.module.css";
import useAxios from "../../apis/axiosWithToken";
import { Link } from "react-router-dom";
// import { getAllFrames } from "../../apis/getFrame";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const [accessToken] = useAtom(accessTokenAtom);
  const axios = useAxios();

  useEffect(() => {
    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      console.log("Framelist ACT:", accessToken); // accessToken jotai에서 잘 불러오는지 확인
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
        },
      };
      axios
        .get(
          "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/list",
          config
        )
        .then((res) => {
          console.log(res.data);

          setFrames(res.data);
        })
        .catch((err) => {
          // 오류 처리
          console.error("API 요청 중 오류 발생:", err);
        });
    }
  }, [accessToken]);

  return (
    <div className={styles.FrameList}>
      <Link to="/makeframe">
        <button className={styles.newFrame}>새 프레임 만들기</button>
      </Link>
      <div className={styles.FrameScroll}>
        {frames.length === 0 ? ( // frames 배열이 비어 있는 경우
          <div className={styles.InfoMsg}>
            <h3>새 프레임을 추가해주세요</h3>
          </div>
        ) : (
          // frames 배열에 프레임이 있는 경우
          <ul className={styles.FrameUl}>
            {frames.map((frame, index) => (
              <li key={frame.id} className={styles.FrameItem}>
                <Link to={"/applyframe"} state={{ selectedFrame: frame }}>
                  <img
                    key={index}
                    src={frame}
                    alt="frame"
                    className={styles.FrameImage}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FrameList;
