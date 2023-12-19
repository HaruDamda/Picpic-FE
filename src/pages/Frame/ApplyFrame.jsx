import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../Frame/ApplyFrame.module.css";
import left from "../../img/left.png";
import trash from "../../img/trash.png";
import photobook from "../../img/book.png";
import frameline from "../../img/frame-line.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";
import html2canvas from "html2canvas";
import AddPhoto from "../../component/MakeFrameCpn/AddPhoto";

const ApplyFrame = () => {
  const location = useLocation();
  console.log("", location);
  const { selectedFrame } = location.state;
  const [selectedButton, setSelectedButton] = useState("프레임 제작");
  const [accessToken] = useAtom(accessTokenAtom);
  const [uploadedImage, setUploadedImage] = useState(null);
  const router = useNavigate();

  console.log(selectedFrame);

  useEffect(() => {
    // uploadedImage 값이 변경될 때 로컬 스토리지에 이미지 데이터를 저장합니다.
    if (uploadedImage) {
      localStorage.setItem("uploadedImage", uploadedImage);
    }
  }, [uploadedImage]);

  useEffect(() => {
    // uploadedImage 값이 변경될 때 로컬 스토리지에 이미지 데이터를 저장합니다.
    if (uploadedImage) {
      localStorage.setItem("uploadedImage", uploadedImage);
    }
  }, [uploadedImage]);

  const handleEditFrame = (frameUrl) => {
    console.log("Edit Frame URL:", frameUrl);

    const editFrameRequest = {
      url: `http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        url: frameUrl,
      },
    };

    axios(editFrameRequest)
      .then((response) => {
        console.log("프레임 수정 요청 성공:", response.data);
      })
      .catch((error) => {
        console.error("프레임 수정 요청 실패:", error);
      });
  };

  const handleDeleteFrame = (frameUrl) => {
    console.log("Delete Frame URL:", frameUrl);

    if (accessToken) {
      const config = {
        data: frameUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
        },
      };
      axios
        .delete(
          "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame",
          config
        )
        .then((res) => {
          console.log(res.data);
          // 성공적으로 데이터를 받아온 경우
          // setFrames(res.data); // 받아온 데이터로 frames 상태 업데이트
        })
        .catch((err) => {
          // 오류 처리
          console.error("API 요청 중 오류 발생:", err);
        });
    }
  };

  const handleUploadedImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    if (accessToken) {
      const frameElement = document.querySelector(`.${styles.Frame}`);
      frameElement.src = selectedFrame;

      html2canvas(frameElement).then((canvas) => {
        const context = canvas.getContext("2d");

        const selectedFrameImg = new Image();
        selectedFrameImg.crossOrigin = "anonymous";
        selectedFrameImg.src =
          selectedFrame + "?timestamp=" + new Date().getTime();
        console.log(selectedFrameImg);
        selectedFrameImg.onload = () => {
          context.drawImage(selectedFrameImg, 0, 0);

          // Convert canvas content to blob and save
          canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append("photo", blob, "frame.png");

            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
              },
            };

            axios
              .post(
                "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/photo",
                formData,
                config
              )
              .then((res) => {
                console.log("프레임 적용한 사진 저장 API 응답:", res.data);
                alert("저장 완료되었습니다.");
                router("/photoselect");
              })
              .catch((err) => {
                console.error("API 요청 중 오류 발생:", err);
              });
          }, "image/png");
        };
      });
    }
  };

  return (
    <div className={styles.ApplyFrame}>
      <div className={styles.ApplyFramebox}>
        <div className={styles.Top}>
          <Link to="/frame">
            <button className={styles.ImgBtn}>
              <img src={left} alt="left" />
            </button>
          </Link>
          <button
            className={styles.ImgBtn}
            onClick={() => handleDeleteFrame(selectedFrame)}
          >
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className={styles.Middle}>
          <div className={styles.MiddleTop}></div>
          <div className={styles.Frame}>
            <img
              src={selectedFrame}
              alt="selectedFrame"
              className={styles.SelectedFrame}
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
        <div className={styles.Bottom}>
          <div className={styles.ButtonList}>
            <label className={styles.addphoto}>
              <span>인생네컷 불러오기</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadedImage}
                style={{ display: "none" }}
              />
            </label>
            <button onClick={handleSaveClick} className={styles.savephoto}>
              사진 저장하기
            </button>
          </div>
          <div className={styles.ListBottom}>
            <Link to="/frame">
              <button className={styles.now}>
                <img src={frameline} alt="frameline"></img>
                전체 프레임
              </button>
            </Link>
            <Link to="/photoselect">
              <button className={styles.now}>
                <img src={photobook} alt="photobook"></img>
                포토북
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyFrame;
