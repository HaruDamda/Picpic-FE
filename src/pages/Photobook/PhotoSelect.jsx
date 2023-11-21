import { useState } from "react";
import styles from "./Photoselect.module.scss";
import photo1 from "../../img/photo1.png";
import photo2 from "../../img/photo2.png";
import photo3 from "../../img/photo3.png";
import photo4 from "../../img/photo4.png";
import photo5 from "../../img/photo5.png";
import photo6 from "../../img/photo6.png";
import photo7 from "../../img/photo7.png";
import photo8 from "../../img/photo8.png";
import photo9 from "../../img/photo9.png";
import photo10 from "../../img/photo10.png";
import photo11 from "../../img/photo11.png";
import circleCheck from "../../img/circle-check-filled.png";
import home from "../../img/home.png";
import Photobook from "./Photobook";
import { Link } from "react-router-dom";

export default function PhotoSelect() {
  const photoArray = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
    photo10,
    photo11,
  ];

  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotoClick = (index) => {
    // 이미 선택된 사진이면 제거, 아니면 추가
    if (selectedPhotos.includes(index)) {
      setSelectedPhotos(
        selectedPhotos.filter((selectedIndex) => selectedIndex !== index)
      );
    } else {
      setSelectedPhotos([...selectedPhotos, index]);
    }

    console.log(selectedPhotos);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header1}>
          <Link to="/">
            <button>
              <img src={home} alt="home" />
            </button>
          </Link>
          <button>선택</button>
        </div>
        <div className={styles.header2}>
          <Link to="/Photobook">
            <button>나만의 포토북 제작하기</button>
          </Link>
        </div>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.boxWrapper}>
          {/* 이미지 배열을 map 함수를 사용하여 렌더링 */}
          {photoArray.map((photo, index) => (
            <div
              key={index}
              className={`${styles.photoBox} ${
                selectedPhotos.includes(index) ? styles.selectedPhoto : ""
              }`}
              onClick={() => handlePhotoClick(index)}
            >
              <img
                className={styles.photo}
                src={photo}
                width={120}
                alt={`photo-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
