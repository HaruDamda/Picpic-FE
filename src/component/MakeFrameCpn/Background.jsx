import color from "../../img/color.png";
import colorpalette from "../../img/colorpalette.png";
import styles from "./Background.module.css";

const Background = () => {
  return (
    <div className={styles.Bottom}>
      <div className={styles.ListTop}>
        <button>
          <img src={color} alt="color" />
        </button>
        <button>
          <img src={colorpalette} alt="colorpalette" />
        </button>
      </div>
      <div className={styles.ListView}>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Background;
