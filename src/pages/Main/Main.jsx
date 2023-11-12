import styles from './Main.module.scss'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <Link to="/login" className={styles.linkBtn}>
        <button className={styles.linkBtn}>로그인</button>
      </Link>
    </>
  );
}