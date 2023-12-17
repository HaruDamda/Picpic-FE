import { useEffect, useState } from "react";
import styles from "./Photoselect.module.scss";
// import circleCheck from "../../img/circle-check-filled.png";
import useAxios from "../../apis/axiosWithToken";
import { useNavigate } from "react-router-dom";

export default function PhotoSelect() {
  const axios = useAxios();
  const [getPhotos, setGetPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const router = useNavigate();

  const handlePhotoClick = (index) => {
    setSelectedPhotos((prevSelectedPhotos) => {
      // 이미 선택된 사진이면 제거, 아니면 추가
      if (prevSelectedPhotos.includes(index)) {
        const newSelectedPhotos = prevSelectedPhotos.filter((selectedIndex) => selectedIndex !== index);
        console.log("삭제 후:", newSelectedPhotos);
        return newSelectedPhotos;
      } else {
        const newSelectedPhotos = [...prevSelectedPhotos, index];
        console.log("추가 후:", newSelectedPhotos);
        return newSelectedPhotos;
      }
    });
  };

  useEffect(() => {
    console.log("세팅 후:", selectedPhotos);
    console.log("api 보내기전: ", selectedPhotos.map(index => getPhotos[index]))
    axios
      .get('/photo')
      .then((response) => {
        setGetPhotos(response.data);
        // console.log(getPhotos);
      })
      .catch((error) => console.error(error));
  }, [selectedPhotos]);
  
  const handlePostData = async () => {
    const data = {
      "name" : "토리",
      "addPhotoList" : selectedPhotos.map(index => getPhotos[index])
    };
  
    try {
      const response = await axios.post('/photoBook', data);
      console.log("API 응답:", response.data);
      router("/photobook");
    } catch (error) {
      console.error("API 오류:", error);
    }
  };

  return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
        <button 
          onClick={handlePostData}
        >
          나만의 포토북 제작하기
        </button>
			</div>
			<div className={styles.bodySection}>
        <div className={styles.boxWrapper}>
          {/* 이미지 배열을 map 함수를 사용하여 렌더링 */}
          {getPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => handlePhotoClick(index)}
              className={styles.photoBox}
            >
              <img
                className={styles.photo}
                src={photo}
                // width={120}
                alt={`photo-${index}`}
              />
              {selectedPhotos.includes(index) && (
                <div className={styles.selectBox}>
                  <div className={styles.selectNumber}>
                    {selectedPhotos.indexOf(index) + 1}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
			</div>
		</div>
  );
}