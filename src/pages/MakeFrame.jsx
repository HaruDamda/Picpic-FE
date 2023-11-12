import React, { useState } from "react";
import home from "../img/home.png";
import save from "../img/save.png";
import template from "../img/template.png";
import sticker from "../img/sticker.png";
import background from "../img/background.png";
import brush from "../img/brush.png";
import addphoto from "../img/addphoto.png";
import styles from "./MakeFrame.module.css";
import Template from "../component/Template";
import Sticker from "../component/Sticker";
import Background from "../component/Background";
import Brush from "../component/Brush";
import AddPhoto from "../component/AddPhoto";

const MakeFrame = () => {
  const [selectedButton, setSelectedButton] = useState("템플릿");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleSaveClick = () => {
    const frameElement = document.querySelector(`.${styles.Frame}`);

    // Frame 클래스의 이미지를 캡처
    html2canvas(frameElement).then((canvas) => {
      // 캔버스를 이미지 데이터 URL로 변환
      const imageData = canvas.toDataURL("image/png");

      // 서버로 이미지 전송
      sendImageToServer(imageData);
    });
  };

  const sendImageToServer = (imageData) => {
    const apiUrl =
      "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/save";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "YOUR_TOKEN_HERE", // 여기에 토큰을 넣어주세요.
      },
      body: JSON.stringify({
        image: imageData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("이미지 저장 성공:", data);
      })
      .catch((error) => {
        console.error("이미지 저장 실패:", error);
      });
  };

  let bottomContent;

  switch (selectedButton) {
    case "템플릿":
      bottomContent = <Template />;
      break;
    case "스티커":
      bottomContent = <Sticker />;
      break;
    case "배경":
      bottomContent = <Background />;
      break;
    case "브러쉬":
      bottomContent = <Brush />;
      break;
    case "사진 추가":
      bottomContent = <AddPhoto />;
      break;
    default:
      bottomContent = <Template />;
      break;
  }

  return (
    <div className={styles.MakeFrame}>
      <div className={styles.Top}>
        <button className={styles.ImgBtn}>
          <img src={home} alt="logo" />
        </button>
        <button className={styles.TextBtn}>가져오기</button>
        <button className={styles.TextBtn}>프레임 보기</button>
        <button className={styles.ImgBtn}>
          <img src={save} alt="save" />
        </button>
      </div>
      <div className={styles.Middle}>
        <div className={styles.Frame}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.Return}>
          <button>◀</button>
          <button>▶</button>
        </div>
      </div>
      <div className={styles.Bottom}>
        {bottomContent}
        <div className={styles.ListBottom}>
          <button
            className={styles.now}
            onClick={() => handleButtonClick("템플릿")}
          >
            <img src={template} alt="template"></img>
            템플릿
          </button>
          <button onClick={() => handleButtonClick("스티커")}>
            <img src={sticker} alt="sticker"></img>
            스티커
          </button>
          <button onClick={() => handleButtonClick("배경")}>
            <img src={background} alt="background"></img>
            배경
          </button>
          <button onClick={() => handleButtonClick("브러쉬")}>
            <img src={brush} alt="brush"></img>
            브러쉬
          </button>
          <button onClick={() => handleButtonClick("사진 추가")}>
            <img src={addphoto} alt="addphoto"></img>
            사진 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeFrame;
