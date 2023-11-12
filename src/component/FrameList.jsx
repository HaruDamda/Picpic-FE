import styles from "./FrameList.module.css";
import { useNavigate } from "react-router-dom";

const FrameList = () => {
  const navigate = useNavigate();

  const goToMakeFrame = () => {
    navigate("../pages/MakeFrame");
  };

  return (
    <div className={styles.FrameList}>
      <button className={styles.newFrame} onClick={goToMakeFrame}>
        새 프레임 만들기
      </button>
      <div className={styles.FrameScroll}></div>
    </div>
  );
};

export default FrameList;
