import React, { useState } from "react";
import styles from "./Sticker.module.css";

const Sticker = () => {
  // 스티커 위치를 추적하는 상태
  const [stickers, setStickers] = useState([]);

  // 드래그 앤 드롭 기능을 처리하는 이벤트 핸들러
  const handleMouseDown = (e, index) => {
    const newStickers = [...stickers];
    newStickers[index] = {
      ...newStickers[index],
      isDragging: true,
      originalX: e.clientX,
      originalY: e.clientY,
    };
    setStickers(newStickers);
  };

  const handleMouseMove = (e, index) => {
    if (stickers[index].isDragging) {
      const newStickers = [...stickers];
      newStickers[index] = {
        ...newStickers[index],
        x:
          e.clientX -
          newStickers[index].originalX +
          newStickers[index].originalX,
        y:
          e.clientY -
          newStickers[index].originalY +
          newStickers[index].originalY,
      };
      setStickers(newStickers);
    }
  };

  const handleMouseUp = (index) => {
    const newStickers = [...stickers];
    newStickers[index] = {
      ...newStickers[index],
      isDragging: false,
    };
    setStickers(newStickers);
  };

  return (
    <div className={styles.Bottom}>
      <div className={styles.ListTop}>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
      </div>
      <div className={styles.ListView}>
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker.image}
            alt="sticker"
            className={styles.Sticker}
            style={{ left: sticker.x, top: sticker.y }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseUp={() => handleMouseUp(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sticker;
