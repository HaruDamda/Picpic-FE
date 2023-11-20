import styles from "./Main.module.scss";
import { Link } from "react-router-dom";
import main_logo from "../../assets/main-logo.png";

export default function Login() {
  return (
    <>
      <Link to="/login" className={styles.linkBtn_container}>
        <button className={styles.linkBtn}>
          <img src={main_logo} alt="main-logo" />
        </button>
      </Link>
    </>
  );
}
