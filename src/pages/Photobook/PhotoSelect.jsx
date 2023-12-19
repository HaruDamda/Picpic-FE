import React, { useState } from "react";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import home from "../../img/home.png";
import map from "../../img/map.png";
import frame from "../../img/frame-line.png";
import book from "../../img/book.png";
import person from "../../img/person.png";
import framelist from "../../img/framelist.png";
import styles from "./PhotoSelect.module.scss";
import Template from "../../component/MakeFrameCpn/Template";
import FrameList from "../../component/AllFrameCpn/FrameList";
import PhotoList from "./PhotoList";
import { Link } from "react-router-dom";

export default function PhotoSelect() {
  const [selectedButton, setSelectedButton] = useState("전체 포토");
  // const [logoPos, setlogoPos] = useState({ x: 0, y: 0 });
  const logoPos = useSpring({ x: 0, y: 0 });
  const bindLogoPos = useDrag((params) => {
    // setlogoPos({
    //   x: params.offset[0],
    //   y: params.offset[1],
    // });
    logoPos.x.set(params.offset[0]);
    logoPos.y.set(params.offset[1]);
  });

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let middleContent;

  switch (selectedButton) {
    case "프레임 제작":
      middleContent = <FrameList />;
      break;
    case "포토북":
      middleContent = <PhotoList />;
      break;
    default:
      middleContent = <PhotoList />;
      break;
  }

  const topSpan = selectedButton === "프레임 제작" ? "Home" : "전체 포토";

  return (
    <div className={styles.Frame}>
      <div className={styles.Top}>
        <Link to="/">
          <button className={styles.ImgBtn}>
            <img src={home} alt="logo" />
          </button>
        </Link>
        <div className={styles.Center}>
          <span>{topSpan}</span>
        </div>
        <div className={styles.Right}>
          <button className={styles.mylistBtn}>
            <img src={framelist} alt="framelist"></img>
          </button>
        </div>
      </div>
      <div className={styles.Middle}>{middleContent}</div>
      <div className={styles.Bottom}>
        <div className={styles.ListBottom}>
          <button onClick={() => handleButtonClick("프레임 제작")}>
            <img src={frame} alt="frame"></img>
            전체 프레임
          </button>
          <button onClick={() => handleButtonClick("포토북")}>
            <img src={book} alt="book"></img>
            포토북
          </button>
        </div>
      </div>
    </div>
  );
}
