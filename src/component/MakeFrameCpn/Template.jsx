import template0 from "../../assets/template-0.png";
import template1 from "../../assets/template-1.png";
import template2 from "../../assets/template-2.png";
import template3 from "../../assets/template-3.png";
import template4 from "../../assets/template-4.png";
import styles from "./Template.module.css";

const Template = ({ changeFrameImage }) => {
  const handleFrameButtonClick = (frameImage) => {
    changeFrameImage(frameImage); // MakeFrame 컴포넌트에서 프레임 이미지 업데이트
  };

  return (
    <div className={styles.Bottom}>
      <div className={styles.ListTop}>
        <button>테마 for.. Beta</button>
      </div>
      <div className={styles.ListView}>
        <button onClick={() => handleFrameButtonClick(template0)}>
          <img src={template0} alt="template0" />
        </button>
        <button onClick={() => handleFrameButtonClick(template1)}>
          <img src={template1} alt="template1" />
        </button>
        <button onClick={() => handleFrameButtonClick(template2)}>
          <img src={template2} alt="template2" />
        </button>
        {/* <button>
          <img src={template3} alt="template3" />
        </button> */}
        <button onClick={() => handleFrameButtonClick(template4)}>
          <img src={template4} alt="template4" />
        </button>
      </div>
    </div>
  );
};

export default Template;
