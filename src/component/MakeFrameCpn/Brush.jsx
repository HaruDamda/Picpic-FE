import React, { useState, useEffect } from "react";
import styles from "./Brush.module.css";
import color from "../../img/color.png";

const Brush = ({ ctx, setCtx }) => {
  const [lineColor, setLineColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [lineOpacity, setLineOpacity] = useState(0.1);

  useEffect(() => {
    // 캔버스 context의 설정을 변경합니다.
    if (ctx) {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = lineOpacity;
    }
  }, [ctx, lineColor, lineWidth, lineOpacity]);

  return (
    <div className={styles.Bottom}>
      <div className={styles.ColorContainer}>
        <label>Brush Color </label>
        <input
          type="color"
          value={lineColor}
          onChange={(e) => {
            setLineColor(e.target.value);
          }}
        />
      </div>
      <div className={styles.BrushContainer}>
        <div className={styles.WidthContainer}>
          <label>Brush Width </label>
          <input
            className={styles.brushwidth}
            type="range"
            min="3"
            max="10"
            value={lineWidth}
            onChange={(e) => {
              setLineWidth(e.target.value);
            }}
          />
        </div>
        <div className={styles.OpacityContainer}>
          <label>Brush Opacity</label>
          <input
            className={styles.brushopacity}
            type="range"
            min="1"
            max="100"
            value={lineOpacity}
            onChange={(e) => {
              setLineOpacity(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Brush;
