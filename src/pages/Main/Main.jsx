import styles from "./Main.module.scss";
import { Link, useNavigate } from "react-router-dom";
import main_logo from "../../assets/main-logo.png";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";

export default function Main() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const router = useNavigate();

  const logout = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      setAccessToken("");
      router("/");
    }
  };

  return (
    <div className={styles.root}>
      <Link to="/login" className={styles.linkBtn_container}>
        <button className={styles.logoBtn}>
          <img src={main_logo} alt="main-logo" />
        </button>
      </Link>
      <Link to="/login" className={styles.linkBtn_container}>
        <button className={styles.loginBtn}>로그인</button>
      </Link>
      <button className={styles.logoutBtn} onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}
