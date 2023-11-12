import React, { useState } from "react";
import map from "../img/map.png";
import frame from "../img/frame-line.png";
import book from "../img/book.png";
import person from "../img/person.png";
import framelist from "../img/framelist.png";
import styles from "./Frame.module.css";
import Template from "../component/Template";
import FrameList from "../component/FrameList";
import Background from "../component/Background";
import Brush from "../component/Brush";
import AddPhoto from "../component/AddPhoto";
import { useNavigate } from "react-router-dom";

const Frame = () => {
  const [selectedButton, setSelectedButton] = useState("지도");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let middleContent;

  switch (selectedButton) {
    case "지도":
      middleContent = "dd";
      break;
    case "프레임 제작":
      middleContent = <FrameList />;
      break;
    case "포토북":
      middleContent = "dd";
      break;
    case "마이":
      middleContent = "dd";
      break;
    default:
      middleContent = "dd";
      break;
  }

  return (
    <div className={styles.Frame}>
      <div className={styles.Top}>
        <span>전체 프레임</span>
        <button className={styles.mylistBtn}>
          <img src={framelist} alt="framelist"></img>
        </button>
      </div>
      <div className={styles.Middle}>{middleContent}</div>
      <div className={styles.Bottom}>
        <div className={styles.ListBottom}>
          <button onClick={() => handleButtonClick("지도")}>
            <img src={map} alt="map"></img>
            템플릿
          </button>
          <button onClick={() => handleButtonClick("프레임 제작")}>
            <img src={frame} alt="frame"></img>
            프레임 제작
          </button>
          <button onClick={() => handleButtonClick("포토북")}>
            <img src={book} alt="book"></img>
            포토북
          </button>
          <button onClick={() => handleButtonClick("마이")}>
            <img src={person} alt="person"></img>
            마이
          </button>
        </div>
      </div>
    </div>
  );
};

export default Frame;
