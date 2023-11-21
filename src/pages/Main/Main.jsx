import styles from "./Main.module.scss";
import { Link, useNavigate } from "react-router-dom";
import main_logo from "../../assets/main-logo.png";
import { useAtom } from "jotai";
import { accessTokenAtom } from "../../store/jotaiAtoms";

export default function Login() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const router = useNavigate();
  
  const logout = () => {
		if (confirm("정말 로그아웃 하시겠습니까?")) {
			localStorage.removeItem("accessToken");
			setAccessToken("");
      router("/");
		}
  }

  return (
    <div className={styles.root}>
      <Link to="/login" className={styles.linkBtn_container}>
        <button className={styles.linkBtn}>
          <img src={main_logo} alt="main-logo" />
        </button>
      </Link>
      <Link to="/login" className={styles.linkBtn_container}>
        <button className={styles.loginBtn}>
          로그인
        </button>
      </Link>
      <Link to="/logout" className={styles.linkBtn_container}>
        <button className={styles.logoutBtn}>
          로그아웃
        </button>
      </Link>
      <Link to="/framelist" className={styles.linkBtn_container}>
        <button className={styles.frameBtn}>
          프레임 만들기
        </button>
      </Link>
    </div>
  );
}
