import styles from "./Brush.module.css";

const Brush = () => {
  return (
    <div className={styles.Bottom}>
      <div className={styles.ListTop}>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
        <button>테마</button>
      </div>
      <div className={styles.ListView}>
        <span></span>
      </div>
    </div>
  );
};

export default Brush;
