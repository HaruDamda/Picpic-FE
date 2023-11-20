import { useState, useEffect } from "react";
import styles from "./FrameList.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { getAllFrames } from "../../apis/getFrame";
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../../store/jotaiAtoms';

const FrameList = () => {
  const [frames, setFrames] = useState([]);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  useEffect(() => {
    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      console.log('Framelist ACT:', accessToken); // accessToken jotai에서 잘 불러오는지 확인
      // axios 요청 설정
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
        },
      };
       // API 요청 보내기
      axios.get('http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/frameList', config)
        .then((res) => {
          console.log(res.data);
          // 성공적으로 데이터를 받아온 경우
          setFrames(res.data); // 받아온 데이터로 frames 상태 업데이트
        })
        .catch((err) => {
          // 오류 처리
          console.error('API 요청 중 오류 발생:', err);
        });
      }
    }, [accessToken]); // useEffect가 실행되는 조건을 accessToken이 변경될 때로 설정

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
