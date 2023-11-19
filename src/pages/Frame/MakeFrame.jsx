import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import home from "../../img/home.png";
import save from "../../img/save.png";
import template from "../../img/template.png";
import sticker from "../../img/sticker.png";
import background from "../../img/background.png";
import brush from "../../img/brush.png";
import addphoto from "../../img/addphoto.png";
import left from "../../img/left.png";
import right from "../../img/right.png";
import framebase from "../../assets/framebase.png";
import styles from "./MakeFrame.module.css";
import Template from "../../component/MakeFrameCpn/Template";
import Sticker from "../../component/MakeFrameCpn/Sticker";
import Background from "../../component/MakeFrameCpn/Background";
import Brush from "../../component/MakeFrameCpn/Brush";
import AddPhoto from "../../component/MakeFrameCpn/AddPhoto";
import html2canvas from "html2canvas";

const BrushSizeSelector = ({ selectedBrushSize, setSelectedBrushSize }) => {
  return (
    <div className={styles.BrushSize}>
      <button
        className={`${styles.BrushSizeButton1} ${
          selectedBrushSize === "large" ? styles.ActiveBrushSize : ""
        }`}
        onClick={() => setSelectedBrushSize("large")}
      ></button>
      <button
        className={`${styles.BrushSizeButton2} ${
          selectedBrushSize === "medium" ? styles.ActiveBrushSize : ""
        }`}
        onClick={() => setSelectedBrushSize("medium")}
      ></button>
      <button
        className={`${styles.BrushSizeButton3} ${
          selectedBrushSize === "small" ? styles.ActiveBrushSize : ""
        }`}
        onClick={() => setSelectedBrushSize("small")}
      ></button>
    </div>
  );
};

const MakeFrame = () => {
  const [selectedButton, setSelectedButton] = useState("템플릿");
  const [isListHover, setIsListHover] = useState(false);
  const [selectedBrushSize, setSelectedBrushSize] = useState("medium");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [stickerPos, setStickerPos] = useState([]);
  const [frameImage, setFrameImage] = useState(framebase);
  const [actions, setActions] = useState([]);

  const accessToken = useSelector((state) => state.user.accessToken);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button !== "브러쉬") {
      // '브러쉬' 버튼이 아닌 경우 브러쉬 크기 설정을 초기화
      setSelectedBrushSize("medium");
    }
  };

  // Sticker 컴포넌트에서 선택한 스티커를 중앙에 나타내기 위한 함수
  const handleStickerSelect = (sticker) => {
    setSelectedSticker(sticker);
  };

  /*if (button === "브러쉬") {
    setIsBrushSizeVisible(true);
  } else {
    setIsBrushSizeVisible(false);
  }*/

  // Sticker에서 전달된 스티커 위치 정보를 받는 함수
  const handleStickerDrag = ({ index, x, y }) => {
    const newStickerPos = [...stickerPos];
    newStickerPos[index] = { x, y };
    setStickerPos(newStickerPos);
  };

  // UploadedImage와 스티커들을 합성하여 보여주는 함수
  const renderFrame = () => {
    const uploadedImageStyle = uploadedImage
      ? { position: "absolute", top: 0, left: 0 }
      : {};

    return (
      <div className={styles.Frame} style={{ position: "relative" }}>
        <img src={framebase} alt="framebase" className={styles.BaseFrame} />
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="uploadedImage"
            className={styles.UploadedImage}
            style={uploadedImageStyle}
          />
        )}
        {stickerPos.map((position, index) => (
          <img
            key={index}
            src={sticker} // 스티커 이미지 경로를 넣어주세요
            alt={`sticker_${index}`}
            className={styles.Sticker}
            style={{ position: "absolute", top: position.y, left: position.x }}
          />
        ))}
      </div>
    );
  };

  const changeFrameImage = (newFrameImage) => {
    setFrameImage(newFrameImage);
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
        Authorization: "Bearer ${accessToken}", // 여기에 토큰을 넣어주세요.
      },
      body: JSON.stringify({
        image: imageData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("이미지 저장 성공:", data);
      })
      .catch((err) => {
        console.error("이미지 저장 실패:", err);
      });
  };

  const handleUploadedImage = (imageData) => {
    setUploadedImage(imageData);
  };

  let bottomContent;

  switch (selectedButton) {
    case "템플릿":
      bottomContent = <Template />;
      break;
    case "스티커":
      bottomContent = <Sticker onStickerSelect={handleStickerSelect} />;
      break;
    case "배경":
      bottomContent = (
        <Background
          changeFrameImage={changeFrameImage}
          frameImage={frameImage}
        />
      );
      break;
    case "브러쉬":
      bottomContent = <Brush selectedColor={selectedColor} />;
      break;
    case "사진 추가":
      bottomContent = <AddPhoto handleUploadedImage={handleUploadedImage} />;
      break;
    default:
      bottomContent = <Template />;
      break;
  }

  const middleContent =
    selectedButton === "브러쉬" ? (
      <div className={styles.SizeSelector}>
        <BrushSizeSelector
          selectedBrushSize={selectedBrushSize}
          setSelectedBrushSize={setSelectedBrushSize}
        />
      </div>
    ) : null;

  // 'left' 버튼을 누를 때 이전 동작으로 되돌리는 함수
  const handleUndo = () => {
    if (actions.length > 0) {
      const lastAction = actions[actions.length - 1];
      // 이전 동작을 실행하기 전에 해당 동작을 배열에서 제거
      setActions((prevActions) => prevActions.slice(0, -1));

      // TODO: 해당 동작에 따른 처리 구현
      // 예를 들어, 특정 동작에 대한 역으로 처리하는 코드 작성
      // 예: if (lastAction === '이미지 추가') { /* 이미지 삭제 로직 */ }
    }
  };

  // 'right' 버튼을 누를 때 다시 실행하는 함수
  const handleRedo = () => {
    // TODO: 재실행 로직 구현
    // actions 배열에 저장된 동작을 순회하며 재실행하는 로직 작성
    // 예: actions.forEach((action) => { /* 각 동작에 대한 처리 */ });
  };

  return (
    <div className={styles.MakeFrame}>
      <div className={styles.MakeFramebox}>
        <div className={styles.Top}>
          <Link to="/frame">
            <button className={styles.ImgBtn}>
              <img src={home} alt="logo" />
            </button>
          </Link>
          <button className={styles.TextBtn}>가져오기</button>
          <button className={styles.TextBtn}>프레임 보기</button>
          <button className={styles.ImgBtn} onClick={handleSaveClick}>
            <img src={save} alt="save" />
          </button>
        </div>
        <div className={styles.Middle}>
          <div className={styles.FrameImg}>
            {middleContent}
            <div className={styles.Frame}>
              <img
                src={frameImage}
                alt="framebase"
                className={styles.BaseFrame}
              />
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="uploadedImage"
                  className={styles.UploadedImage}
                />
              )}
            </div>
          </div>
          <div className={styles.Return}>
            <button onClick={handleUndo}>
              <img src={left} alt="left" />
            </button>
            <button onClick={handleRedo}>
              <img src={right} alt="right" />
            </button>
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
    </div>
  );
};

export default MakeFrame;
