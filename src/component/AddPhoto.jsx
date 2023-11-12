import addbutton from "../img/addbutton.png";
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
