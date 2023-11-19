import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import styles from "./Sticker.module.css";
import axios from "axios";

const Sticker = ({ onStickerSelect }) => {
  const [stickers, setStickers] = useState([]);
  const [stickerPos, setstickerPos] = useState({ x: 0, y: 0 });
  const [selectedTheme, setSelectedTheme] = useState(1);

  const themes = [1, 2, 3, 4, 5];

  // 서버로부터 스티커 데이터를 가져오는 함수
  const fetchStickers = async (theme) => {
    try {
      const res = await axios.get(
        `http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/get/sticker/${theme}`
      );
      const imageStickers = res.data.filter((url, index) => index !== 0);
      console.log("이미지 URL 리스트:", imageStickers);
      setStickers(imageStickers); // 서버로부터 받아온 스티커 데이터 설정
    } catch (err) {
      console.error("Error fetching stickers:", err);
    }
  };

  useEffect(() => {
    // 초기 렌더링 시, 테마 1의 스티커를 가져옴 (예시로 테마 1을 가져오도록 설정)
    fetchStickers(selectedTheme);
  }, [selectedTheme]);

  const handleThemeClick = (themeNumber) => {
    setSelectedTheme(themeNumber); // 클릭된 테마 버튼의 테마 번호를 설정
  };

  const handleStickerClick = (stickerInfo) => {
    // 선택한 스티커 정보를 MakeFrame 컴포넌트로 전달
    onStickerSelect(stickerInfo);
  };

  return (
    <div className={styles.Bottom}>
      <div className={styles.ListTop}>
        {themes.map((theme, index) => (
          <button key={index} onClick={() => handleThemeClick(theme)}>
            테마 {theme}
          </button>
        ))}
      </div>
      <div className={styles.ListView}>
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt="sticker"
            className={styles.Sticker}
            onClick={() => handleStickerClick(sticker)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sticker;
