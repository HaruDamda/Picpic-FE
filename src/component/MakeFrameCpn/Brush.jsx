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
            selectedColor === "#FFFFFF" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#FFFFFF" }}
          onClick={() => handleColorClick("#FFFFFF")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#000000" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#000000" }}
          onClick={() => handleColorClick("#000000")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#009EFF" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#009EFF" }}
          onClick={() => handleColorClick("#009EFF")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#53DF50" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#53DF50" }}
          onClick={() => handleColorClick("#53DF50")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#FFCB33" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#FFCB33" }}
          onClick={() => handleColorClick("#FFCB33")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#FF9634" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#FF9634" }}
          onClick={() => handleColorClick("#FF9634")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#FF6060" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#FF6060" }}
          onClick={() => handleColorClick("#FF6060")}
        ></button>
        <button
          className={`${styles.ColorButton} ${
            selectedColor === "#FF93E1" ? styles.ActiveColorButton : ""
          }`}
          style={{ background: "#FF93E1" }}
          onClick={() => handleColorClick("#FF93E1")}
        ></button>
      </div>
    </div>
  );
};

export default Brush;
