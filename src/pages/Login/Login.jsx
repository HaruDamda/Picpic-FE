"use client";

import { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";
import chevron from "../../assets/icons8-셰브론-오른쪽-52.png";
import { Link, useNavigate } from "react-router-dom";
// import { useLogin } from "../../apis/onLogin";
import { useAtom } from 'jotai';
import { accessTokenAtom } from '../../store/jotaiAtoms';
import axios from 'axios';

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isActivePw, setIsActivePw] = useState(false);
	const router = useNavigate();
  // const onLogin = onLogin();
	const [act, setAct] = useAtom(accessTokenAtom);

  useEffect(() => {
    // act 상태가 업데이트될 때마다 콘솔에 출력
    console.log("Access Token from Jotai:", act);
		if (act) {
			router("/framelist"); // act가 업데이트 되면 라우팅
		}
  }, [act]); // act가 변경될 때마다 useEffect 실행

  const isPassedLogin = () => {
    return email.includes("@") && email.length > 5 && email.includes(".")
      ? setIsActive(true)
      : setIsActive(false);
  };
  const isCorrectPassword = () => {
    return password.length > 7 && isActive
      ? setIsActivePw(true)
      : setIsActivePw(false);
  };

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  const handleInputPw = (event) => {
    setPassword(event.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    axios
      .post(
        "http://ec2-3-35-208-177.ap-northeast-2.compute.amazonaws.com:8080/user/login",
        data
      )
      .then((res) => {
        const accessToken = res.data;
        setAct(accessToken); // 액세스 토큰을 Jotai 상태에 업데이트
        // router('/framelist');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
		<div className={styles.LoginForm}>
			<div className={styles.LoginBox}>
				<img
					className={styles.LOGO}
					src={logo}
					width={120}
					alt="logo_login"
				/>
				<p className={styles.subtitle}>
					네컷사진, 이제 내맘대로 커스텀해요
					<br />
					PicPic과 함께 친구들과의 추억 공유하기~!
				</p>
				{/* <h3 className={styles.loginTitle}>로그인</h3> */}
				<input
					className={
						isActive || email === ""
							? styles.emailInputBox
							: styles.emailInputBox1
					}
					onChange={handleInput}
					onKeyUp={isPassedLogin}
					type="email"
					required
					placeholder="이메일 주소"></input>
				<p
					className={
						isActive || email === "" ? styles.nowarning : styles.warning
					}>
					올바른 이메일을 입력해주세요
				</p>
				<input
					className={
						isActivePw || password === ""
							? styles.emailInputBox
							: styles.emailInputBox1
					}
					onChange={handleInputPw}
					onKeyUp={isCorrectPassword}
					type="password"
					required
					placeholder="비밀번호 (8자 이상 숫자+영문자)"></input>
				<p
					className={
						isActivePw || password === "" ? styles.nowarning : styles.warning
					}>
					비밀번호는 숫자+영문자 조합으로 8자리 이상 입력해 주세요
				</p>
				<button
					onClick={(e) => login(e)}
					className={
						isActive && email !== "" && isActivePw && password !== ""
							? styles.submitBtn
							: styles.unactiveBtn
					}
					disabled={isActive && email !== "" && isActivePw && password !== "" ? false : true}>
					로그인
				</button>
				<Link to="/join" className={styles.findBtn}>
					<p className={styles.forgotten}>회원이 아니시라면</p>
					<span>
						<img className={styles.chevron} src={chevron} width={16} alt="chevron" />
					</span>
				</Link>
				<hr className={styles.liner} />
				<div className={styles.partSection}>
					<Link className={styles.terms} to="/Terms">
						이용약관
					</Link>
					<Link className={styles.policy} to="/Policy">
						개인정보처리방침
					</Link>
				</div>
				<p className={styles.footer}>Ⓒ PICPIC</p>
			</div>
		</div>
  );
}
