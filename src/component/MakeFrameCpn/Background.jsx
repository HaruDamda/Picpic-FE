import color from "../../img/color.png";
import colorpalette from "../../img/colorpalette.png";
import frame_FFC700 from "../../assets/frame-FFC700.png";
import frame_FFFDBA from "../../assets/frame-FFFDBA.png";
import frame_FFDE7D from "../../assets/frame-FFDE7D.png";
import frame_F69401 from "../../assets/frame-F69401.png";
import frame_8BD3FF from "../../assets/frame-8BD3FF.png";
import frame_0066FF from "../../assets/frame-0066FF.png";
import frame_009EFF from "../../assets/frame-009EFF.png";
import frame_F1FFAD from "../../assets/frame-F1FFAD.png";
import styles from "./Background.module.css";

const Background = ({ changeFrameImage }) => {
  const handleFrameButtonClick = (frameImage) => {
    changeFrameImage(frameImage); // MakeFrame 컴포넌트에서 프레임 이미지 업데이트
  };

  return (
    <div className={styles.Bottom}>
      <div className={styles.ListTop}>
        <button>
          <img src={color} alt="color" />
        </button>
        <button>
          <img src={colorpalette} alt="colorpalette" />
        </button>
      </div>
      <div className={styles.ListView}>
        <div className={styles.FirstLine}>
          <button onClick={() => handleFrameButtonClick(frame_FFC700)}></button>
          <button onClick={() => handleFrameButtonClick(frame_FFFDBA)}></button>
          <button onClick={() => handleFrameButtonClick(frame_FFDE7D)}></button>
          <button onClick={() => handleFrameButtonClick(frame_F69401)}></button>
        </div>
        <div className={styles.SecondLine}>
          <button onClick={() => handleFrameButtonClick(frame_8BD3FF)}></button>
          <button onClick={() => handleFrameButtonClick(frame_0066FF)}></button>
          <button onClick={() => handleFrameButtonClick(frame_009EFF)}></button>
          <button onClick={() => handleFrameButtonClick(frame_F1FFAD)}></button>
        </div>
      </div>
    </div>
  );
};

export default Background;
