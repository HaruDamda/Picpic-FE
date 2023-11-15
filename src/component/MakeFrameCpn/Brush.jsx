import React, { useState } from "react";
import styles from "./Brush.module.css";
import color from "../../img/color.png";

const Brush = () => {
  // 초기 색상은 검정색으로 설정
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.Bottom}>
      <div className={styles.ColorContainer}>
        <button>
          <img src={color} alt="color" />
        </button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#000000" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#000000" }}
          onClick={() => handleColorClick("#000000")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#ff0000" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#ff0000" }}
          onClick={() => handleColorClick("#ff0000")}
        ></button>
        {/* 추가적인 색상 버튼들을 여기에 추가 */}
      </div>
    </div>
  );
};

export default Brush;
