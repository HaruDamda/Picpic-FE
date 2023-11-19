import React from "react";
import addbutton from "../../img/addbutton.png";
import styles from "./AddPhoto.module.css";

const AddPhoto = ({ handleUploadedImage }) => {
  const fileInput = React.useRef(null);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    // FileReader를 사용하여 선택된 파일을 읽습니다.
    const reader = new FileReader();
    reader.onloadend = () => {
      // 이미지 데이터를 MakeFrame 컴포넌트로 전달합니다.
      handleUploadedImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className={styles.Bottom}>
      <div className={styles.ListView}>
        <button onClick={handleButtonClick}>
          <img src={addbutton} alt="addbutton" />
        </button>
        <input
          type="file"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default AddPhoto;