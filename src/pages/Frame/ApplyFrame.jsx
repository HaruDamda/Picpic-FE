import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../Frame/ApplyFrame.module.css";
import edit from "../../img/edit.png";
import trash from "../../img/trash.png";
import photobook from "../../img/book.png";
import frameline from "../../img/frame-line.png";
import { Link, useLocation } from "react-router-dom";
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

    // 수정할 프레임의 URL과 accessToken을 이용하여 PUT 요청을 생성
    const editFrameRequest = {
      url: `http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        url: frameUrl, // 수정할 프레임의 URL
        // 여기에 수정할 데이터 추가 (예: 수정된 프레임의 새로운 URL 등)
      },
    };

    // Axios를 사용하여 PUT 요청 보내기
    axios(editFrameRequest)
      .then((response) => {
        // 수정 요청이 성공했을 때의 동작
        console.log("프레임 수정 요청 성공:", response.data);
        // 필요에 따라 상태(state)를 업데이트하거나 다른 작업 수행
      })
      .catch((error) => {
        // 수정 요청이 실패했을 때의 동작
        console.error("프레임 수정 요청 실패:", error);
        // 오류 처리 혹은 다른 처리 로직 구현
      });
  };

  const handleDeleteFrame = (frameUrl) => {
    console.log("Delete Frame URL:", frameUrl);

    // 삭제할 프레임의 URL과 accessToken을 이용하여 DELETE 요청을 생성
    const deleteFrameRequest = {
      url: `http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/frame`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: frameUrl,
    };

    // Axios를 사용하여 DELETE 요청 보내기
    axios(deleteFrameRequest)
      .then((response) => {
        // 삭제 요청이 성공했을 때의 동작
        console.log("프레임 삭제 요청 성공:", response.data);
        // 필요에 따라 상태(state)를 업데이트하거나 다른 작업 수행
      })
      .catch((error) => {
        // 삭제 요청이 실패했을 때의 동작
        console.error("프레임 삭제 요청 실패:", error);
        // 오류 처리 혹은 다른 처리 로직 구현
      });
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
    // 액세스 토큰이 있을 때만 API 요청을 보내도록 조건 처리
    if (accessToken) {
      const frameElement = document.querySelector("img");
      frameElement.src = selectedFrame;

      html2canvas(frameElement).then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("photo", blob, "photo.png");

          console.log(formData);

          // axios 요청 설정
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`, // 헤더에 accessToken을 추가
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
            })
            .catch((err) => {
              // 오류 처리
              console.error("API 요청 중 오류 발생:", err);
            });
        }, "image/png");
      });
    }
  };

  return (
    <div className={styles.ApplyFrame}>
      <div className={styles.ApplyFramebox}>
        <div className={styles.Top}>
          <button
            className={styles.ImgBtn}
            onClick={() => handleEditFrame(selectedFrame)}
          >
            <img src={edit} alt="edit" />
          </button>
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
            <Link to="/photobook">
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
