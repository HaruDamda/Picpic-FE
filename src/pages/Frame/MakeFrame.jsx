import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";

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
  const [stickerPositionsitions, setStickerPositionsitions] = useState([]);
  const [frameImage, setFrameImage] = useState(framebase);
  const [actions, setActions] = useState([]);
  const [uploadedSticker, setUploadedSticker] = useState(null);
  const [stickerSize, setStickerSize] = useState(100);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [accessToken] = useAtom(accessTokenAtom);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button !== "브러쉬") {
      // '브러쉬' 버튼이 아닌 경우 브러쉬 크기 설정을 초기화
      setSelectedBrushSize("medium");
    }
  };

  /*if (button === "브러쉬") {
    setIsBrushSizeVisible(true);
  } else {
    setIsBrushSizeVisible(false);
  }*/

  const handleStickerSelect = (selectedSticker) => {
    // Sticker 컴포넌트로부터 받은 스티커 정보로 중앙에 스티커 렌더링
    setUploadedSticker(selectedSticker);
    setSelectedSticker(selectedSticker);
  };

  // Sticker에서 전달된 스티커 위치 정보를 받는 함수
  const handleStickerDrag = ({ index, x, y }) => {
    const newStickerPositionsitions = [...stickerPositionsitions];
    newStickerPositionsitions[index] = { x, y };
    setStickerPositionsitions(newStickerPositionsitions);
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
        {stickerPositions.map((position, index) => (
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
    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      // axios 요청 설정
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
        },
      };

      const frameElement = document.querySelector(`.${styles.Frame}`);
      html2canvas(frameElement).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");

        axios
          .post(
            "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame",
            {
              image: imageData,
            },
            config
          )
          .then((res) => {
            console.log("프레임 저장 API 응답:", res.data);
            // 성공적으로 데이터를 받아온 경우
            // 받아온 데이터로 frames 상태 업데이트
          })
          .catch((err) => {
            // 오류 처리
            console.error("API 요청 중 오류 발생:", err);
          });
      });
    }
  };

  useEffect(() => {
    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      // axios 요청 설정
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
        },
      };

      const frameElement = document.querySelector(`.${styles.Frame}`);
      html2canvas(frameElement).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");

        axios
          .post(
            "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame/save",
            {
              image: imageData,
            },
            config
          )
          .then((res) => {
            console.log("프레임 저장 API 응답:", res.data);
            // 성공적으로 데이터를 받아온 경우
            // 받아온 데이터로 frames 상태 업데이트
          })
          .catch((err) => {
            // 오류 처리
            console.error("API 요청 중 오류 발생:", err);
          });
      });
    }
  }, [accessToken]);

  const handleUploadedImage = (imageData) => {
    setUploadedImage(imageData);
    console.log(uploadedImage);
  };

  let bottomContent;

  switch (selectedButton) {
    case "템플릿":
      bottomContent = (
        <Template changeFrameImage={changeFrameImage} frameImage={frameImage} />
      );
      break;
    case "스티커":
      bottomContent = <Sticker handleStickerSelect={handleStickerSelect} />;
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
              {uploadedSticker && (
                <img
                  src={uploadedSticker}
                  alt="uploadedSticker"
                  className={styles.UploadedSticker}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: `${stickerSize}px`,
                    height: `${stickerSize}px`,
                  }}
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
