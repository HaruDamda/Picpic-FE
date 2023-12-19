import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import styles from "./Sticker.module.css";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";
import axios from "axios";

const Sticker = ({ handleStickerSelect }) => {
  const [stickers, setStickers] = useState([]);
  const [stickerPos, setstickerPos] = useState({ x: 0, y: 0 });
  const [selectedTheme, setSelectedTheme] = useState(1);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [stickerSize, setStickerSize] = useState(100); // 초기 스티커 크기
  const [accessToken] = useAtom(accessTokenAtom);

  const themes = [1, 2, 3, 4, 5];

  useEffect(() => {
    // API 요청 시 accessToken을 헤더에 추가하여 요청
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    fetchStickers(selectedTheme, config); // fetchStickers 함수에 추가된 config 객체 전달
  }, [selectedTheme, accessToken]);

  // 서버로부터 스티커 데이터를 가져오는 함수
  const fetchStickers = async (theme, config) => {
    try {
      const res = await axios.get(
        `http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/stickerList/${theme}`,
        config
      );
      const imageStickers = res.data.filter((url, index) => index !== 0);
      console.log("이미지 URL 리스트:", imageStickers);
      setStickers(imageStickers); // 서버로부터 받아온 스티커 데이터 설정
    } catch (err) {
      console.error("Error fetching stickers:", err);
    }
  };

  const handleThemeClick = (themeNumber) => {
    setSelectedTheme(themeNumber); // 클릭된 테마 버튼의 테마 번호를 설정
  };

  const handleStickerClick = (stickerInfo) => {
    setSelectedSticker(stickerInfo);
    // 선택한 스티커 정보를 MakeFrame 컴포넌트로 전달
    handleStickerSelect(stickerInfo);
  };

  function handleSizeChange(event) {
    setStickerSize(event.target.value); // 스티커 크기 업데이트
  }

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
      {selectedSticker && (
        <div className={styles.SizeSlider}>
          <input
            type="range"
            min="50"
            max="200"
            step="5"
            value={stickerSize}
            onChange={handleSizeChange}
            className={styles.SliderInput}
          />
          <span>스티커 크기 조절</span>
        </div>
      )}
    </div>
  );
};

export default Sticker;
