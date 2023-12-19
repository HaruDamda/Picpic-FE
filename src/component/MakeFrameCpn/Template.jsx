import template0 from "../../assets/template-0.png";
import template1 from "../../assets/template-1.png";
import template2 from "../../assets/template-2.png";
import template3 from "../../assets/template-3.png";
import template4 from "../../assets/template-4.png";
import template5 from "../../assets/template-5.png";
import template6 from "../../assets/template-6.png";
import template7 from "../../assets/template-7.png";
import template8 from "../../assets/template-8.png";
import template9 from "../../assets/template-9.png";
import template10 from "../../assets/template-10.png";
import template11 from "../../assets/template-11.png";
import template12 from "../../assets/template-12.png";
import template13 from "../../assets/template-13.png";
import template14 from "../../assets/template-14.png";
import template15 from "../../assets/template-15.png";
import styles from "./Template.module.css";

const Template = ({ changeFrameImage }) => {
  const handleFrameButtonClick = (frameImage) => {
    changeFrameImage(frameImage); // MakeFrame 컴포넌트에서 프레임 이미지 업데이트
  };

  return (
    <div className={styles.Bottom}>
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
        <button onClick={() => handleFrameButtonClick(template3)}>
          <img src={template3} alt="template3" />
        </button>
        <button onClick={() => handleFrameButtonClick(template4)}>
          <img src={template4} alt="template4" />
        </button>
        <button onClick={() => handleFrameButtonClick(template5)}>
          <img src={template5} alt="template5" />
        </button>
        <button onClick={() => handleFrameButtonClick(template6)}>
          <img src={template6} alt="template6" />
        </button>
        <button onClick={() => handleFrameButtonClick(template7)}>
          <img src={template7} alt="template7" />
        </button>
        <button onClick={() => handleFrameButtonClick(template8)}>
          <img src={template8} alt="template8" />
        </button>
        <button onClick={() => handleFrameButtonClick(template9)}>
          <img src={template9} alt="template9" />
        </button>
        <button onClick={() => handleFrameButtonClick(template10)}>
          <img src={template10} alt="template10" />
        </button>
        <button onClick={() => handleFrameButtonClick(template11)}>
          <img src={template11} alt="template11" />
        </button>
        <button onClick={() => handleFrameButtonClick(template12)}>
          <img src={template12} alt="template12" />
        </button>
        <button onClick={() => handleFrameButtonClick(template13)}>
          <img src={template13} alt="template13" />
        </button>
        <button onClick={() => handleFrameButtonClick(template14)}>
          <img src={template14} alt="template14" />
        </button>
        <button onClick={() => handleFrameButtonClick(template15)}>
          <img src={template15} alt="template15" />
        </button>
      </div>
    </div>
  );
};

export default Template;
