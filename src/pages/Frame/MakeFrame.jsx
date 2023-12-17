import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
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

const stickerImg = new Image();
const INITIAL_POSITION = { x: 0, y: 0 };
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;

const MakeFrame = () => {
  const [selectedButton, setSelectedButton] = useState("템플릿");
  const [isListHover, setIsListHover] = useState(false);
  const [selectedBrushSize, setSelectedBrushSize] = useState("medium");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [stickerPositions, setStickerPositions] = useState([]);
  const [frameImage, setFrameImage] = useState(framebase);
  const [actions, setActions] = useState([]);
  const [uploadedSticker, setUploadedSticker] = useState(null);
  const [stickerSize, setStickerSize] = useState(50);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [accessToken] = useAtom(accessTokenAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingStickerIndex, setDraggingStickerIndex] = useState(null);
  const [stickerPos, setStickerPos] = useState({ x: 100, y: 100 });
  const [frames, setFrames] = useState([]);
  const [bottomContentHeight, setBottomContentHeight] = useState(270);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  const zoomCanvasRef = useRef(null);
  const scaleRef = useRef(1);
  const panningRef = useRef(false);
  const viewPosRef = useRef(INITIAL_POSITION);
  const startPosRef = useRef(INITIAL_POSITION);

  const frameRef = useRef(null);

  useEffect(() => {
    const frameElement = frameRef.current;
    const frameWidth = frameElement.offsetWidth;
    const frameHeight = frameElement.offsetHeight;

    // Canvas 요소에 Frame 영역과 동일한 크기를 설정
    const canvas = canvasRef.current;
    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;

    setCtx(context);
  }, []);

  // 브러쉬 로직
  const startDrawing = ({ nativeEvent }) => {
    if (selectedButton === "브러쉬") {
      console.log(nativeEvent);
      setIsDrawing(true);

      const { offsetX, offsetY } = nativeEvent;
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      }
    }
  };

  const finishDrawing = () => {
    if (selectedButton === "브러쉬") {
      setIsDrawing(false);
    }
  };

  const drawing = ({ nativeEvent }) => {
    if (selectedButton === "브러쉬" && isDrawing) {
      const { offsetX, offsetY } = nativeEvent;
      if (ctx) {
        // Frame 영역 내에서만 브러쉬 그리기
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const setTransform = () => {
    const zoomCanvas = zoomCanvasRef.current;
    const context = zoomCanvas.getContext("2d");
    context.setTransform(
      scaleRef.current,
      0,
      0,
      scaleRef.current,
      viewPosRef.current.x,
      viewPosRef.current.y
    );
  };

  const draw = () => {
    const zoomCanvas = zoomCanvasRef.current;
    const context = zoomCanvas.getContext("2d");
    zoomCanvas.width = zoomCanvas.width;
    setTransform();
    context.drawImage(stickerImg, 0, 0, zoomCanvas.width, zoomCanvas.height);
  };

  useEffect(() => {
    stickerImg.src = selectedSticker; // MakeFrame 컴포넌트에서 사용하는 이미지 URL로 변경
    // Load image
    stickerImg.onload = function () {
      draw();
    };
  }, []);

  const handleStickerMouseDown = (index, e) => {
    if (!zoomCanvasRef.current) return;

    const zoomCanvas = zoomCanvasRef.current;
    const rect = zoomCanvas.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    startPosRef.current = {
      x: offsetX - viewPosRef.current.x,
      y: offsetY - viewPosRef.current.y,
    };
    panningRef.current = true;

    setDraggingStickerIndex(index);
  };

  const handleStickerMouseMove = (e) => {
    if (!panningRef.current || draggingStickerIndex === null) {
      return;
    }

    if (!zoomCanvasRef.current) return;
    const frameElement = frameRef.current;
    const frameRect = frameElement.getBoundingClientRect();

    const zoomCanvas = zoomCanvasRef.current;
    zoomCanvas.width = frameRect.width;
    zoomCanvas.height = frameRect.height;

    const offsetX = e.clientX - frameRect.left;
    const offsetY = e.clientY - frameRect.top;

    let newX = offsetX - startPosRef.current.x;
    let newY = offsetY - startPosRef.current.y;

    // 프레임 영역 내에서만 스티커 위치 변경 가능하도록 설정
    newX = Math.max(newX, 0 + stickerSize / 2); // X 좌표가 음수가 되지 않도록
    newY = Math.max(newY, 0 + stickerSize / 2); // Y 좌표가 음수가 되지 않도록
    newX = Math.min(newX, frameRect.width - stickerSize / 2); // X 좌표가 프레임 영역을 벗어나지 않도록
    newY = Math.min(newY, frameRect.height - stickerSize / 2); // Y 좌표가 프레임 영역을 벗어나지 않도록

    viewPosRef.current = { x: newX, y: newY };

    // 드래그 중인 스티커의 새 위치 설정
    const updatedStickerPositions = [...stickerPositions];
    updatedStickerPositions[draggingStickerIndex] = {
      x: viewPosRef.current.x,
      y: viewPosRef.current.y,
    };
    setStickerPositions(updatedStickerPositions);
    draw();
  };

  const handleStickerMouseUp = () => {
    panningRef.current = false;
  };

  const handleWheel = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    e.preventDefault();
    const xs = (offsetX - viewPosRef.current.x) / scaleRef.current;
    const ys = (offsetY - viewPosRef.current.y) / scaleRef.current;
    const delta = -e.deltaY;
    const newScale =
      delta > 0 ? scaleRef.current * 1.2 : scaleRef.current / 1.2;

    if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
      scaleRef.current = newScale;
      viewPosRef.current = {
        x: offsetX - xs * scaleRef.current,
        y: offsetY - ys * scaleRef.current,
      };
    }
    draw();
  };

  const handleStickerSelect = (selectedSticker) => {
    setSelectedStickers((prevSelectedStickers) => [
      ...prevSelectedStickers,
      selectedSticker,
    ]);
    // Sticker 컴포넌트로부터 받은 스티커 정보로 중앙에 스티커 렌더링
    setSelectedSticker(selectedSticker);

    // Frame 영역 내부의 좌표로 스티커 위치 지정
    const frameElement = document.querySelector(`.${styles.Frame}`);
    const frameRect = frameElement.getBoundingClientRect();
    const initialStickerPosition = {
      x: frameRect.width / 2, // Frame 가로 중앙
      y: frameRect.height / 2, // Frame 세로 중앙
    };

    // 이전 위치 정보와 함께 새로운 스티커 위치 정보를 추가하여 업데이트
    setStickerPositions([...stickerPositions, initialStickerPosition]);

    console.log("선택된 스티커 정보:", selectedSticker);
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 스티커 위치와 크기를 불러옵니다.
  useEffect(() => {
    const storedStickerPositions = JSON.parse(
      localStorage.getItem("stickerPositions")
    );
    const storedStickerSize = localStorage.getItem("stickerSize");

    if (storedStickerPositions) {
      setStickerPositions(storedStickerPositions);
    }

    if (storedStickerSize) {
      setStickerSize(Number(storedStickerSize));
    }
  }, []);

  const changeFrameImage = (newFrameImage) => {
    setFrameImage(newFrameImage);
  };

  const handleSaveClick = () => {
    setUploadedImage(null);

    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      const frameElement = document.querySelector(`.${styles.Frame}`);

      html2canvas(frameElement, { backgroundColor: null }).then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("frame", blob, "frame.png");

          // axios 요청 설정
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
            },
          };

          axios
            .post(
              "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame",
              formData,
              config
            )
            .then((res) => {
              console.log("프레임 저장 API 응답:", res.data);
              const updatedFrames = [...frames, res.data]; // 새로운 데이터 추가
              setFrames(updatedFrames);
            })
            .catch((err) => {
              // 오류 처리
              console.error("API 요청 중 오류 발생:", err);
            });
        }, "image/png");
      });
    }
  };

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
      bottomContent = (
        <Sticker
          handleStickerSelect={(selectedSticker) =>
            handleStickerSelect(selectedSticker)
          }
        />
      );
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
      bottomContent = (
        <div
          className={styles.ListBottom}
          style={{
            height: "70px",
          }}
        >
          <Brush ctx={ctx} setCtx={setCtx} />
        </div>
      );
      break;
    case "사진 추가":
      bottomContent = <AddPhoto handleUploadedImage={handleUploadedImage} />;
      break;
    default:
      bottomContent = <Template />;
      break;
  }

  // 실행 취소 기능 구현
  const undoAction = () => {
    // actions 배열에 저장된 액션이 있을 때만 실행 취소 수행
    if (actions.length > 0) {
      const lastAction = actions[actions.length - 1];

      // 이전 액션을 실행하여 상태를 되돌립니다.
      if (lastAction.type === "frame_added") {
        // 프레임이 추가된 액션이면 추가된 프레임을 제거합니다.
        const updatedFrames = frames.slice(0, -1);
        setFrames(updatedFrames);
      }

      // actions 배열에서 취소된 액션을 제거합니다.
      setActions(actions.slice(0, -1));
    }
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
          <button className={styles.ImgBtn} onClick={handleSaveClick}>
            <img src={save} alt="save" />
          </button>
        </div>
        <div className={styles.Middle}>
          <div className={styles.Frame} ref={frameRef}>
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
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={drawing}
              onMouseLeave={finishDrawing}
              className={styles.BrushClass}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: selectedButton === "브러쉬" ? "auto" : "none",
              }}
            />
            <canvas
              ref={zoomCanvasRef}
              onMouseDown={handleStickerMouseDown}
              onMouseMove={handleStickerMouseMove}
              onMouseUp={handleStickerMouseUp}
              onWheel={handleWheel}
            />
            {selectedStickers.map((selectedSticker, index) => (
              <img
                key={index}
                src={selectedSticker} // 스티커 이미지 경로를 넣어주세요
                alt={`sticker_${index}`}
                className={styles.UploadedSticker}
                style={{
                  position: "absolute",
                  top: stickerPositions[index]?.y || 0, // y 좌표 설정
                  left: stickerPositions[index]?.x || 0, // x 좌표 설정
                  width: `${stickerSize}px`, // 스티커 사이즈 조절
                  height: `${stickerSize}px`, // 스티커 사이즈 조절
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                draggable="false"
                onMouseDown={(e) => handleStickerMouseDown(index, e)}
                onMouseMove={handleStickerMouseMove}
                onMouseUp={handleStickerMouseUp}
                onMouseLeave={handleStickerMouseUp}
              />
            ))}
          </div>
          <div className={styles.Return}>
            <button onClick={undoAction}>실행 취소</button>
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
              네컷 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeFrame;
