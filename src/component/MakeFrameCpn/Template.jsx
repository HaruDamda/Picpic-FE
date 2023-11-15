import styles from "./Template.module.css";

const Template = () => {
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
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Template;
