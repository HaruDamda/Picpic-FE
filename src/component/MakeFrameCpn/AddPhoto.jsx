import React from "react";
import addbutton from "../../img/addbutton.png";
import styles from "./AddPhoto.module.css";

const AddPhoto = () => {
  const fileInput = React.useRef(null);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    // 여기서 선택된 파일을 처리하거나 필요한 로직을 수행할 수 있습니다.
    console.log(selectedFile);
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
import addbutton from "../../img/addbutton.png";
import styles from "./AddPhoto.module.css";

const AddPhoto = () => {
  return (
    <div className={styles.Bottom}>
      <div className={styles.ListView}>
        <button>
          <img src={addbutton} alt="addbutton" />
        </button>
      </div>
    </div>
  );
};

export default AddPhoto;
