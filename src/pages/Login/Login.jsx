"use client";

import { useState } from "react";
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png";
import chevron from "../../assets/icons8-셰브론-오른쪽-52.png";
import { useNavigate, Link } from "react-router-dom";
import { onLogin } from "../../apis/onLogin";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

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
    const requestBody = {
      email,
      password,
    };
    onLogin(requestBody.email, requestBody.password, router);
    // router("/dashboard");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.LoginForm}>
        <div className={styles.LoginBox}>
          <img
            className={styles.LOGO}
            src={logo}
            width={120}
            alt="logo_login"
          />
          {/** 
					<h4 className={styles.LoginTitle}>
						하나의 계정으로
						<br />
						더욱 편리하게
					</h4>
          */}
          <p className={styles.subtitle}>
            네컷사진, 이제 내맘대로 커스텀해요
            <br />
            PicPic과 함께 친구들과의 추억 공유하기~!
          </p>
          <h4 className={styles.signUpTitle}>로그인</h4>
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
            placeholder="이메일을 입력해주세요"
          ></input>
          <p
            className={
              isActive || email === "" ? styles.nowarning : styles.warning
            }
          >
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
            placeholder="비밀번호를 입력해주세요"
          ></input>
          <p
            className={
              isActivePw || password === "" ? styles.nowarning : styles.warning
            }
          >
            올바른 비밀번호를 입력해주세요
          </p>
          <button
            onClick={(e) => login(e)}
            className={
              isActive && email !== "" && isActivePw && password !== ""
                ? styles.submitBtn
                : styles.unactiveBtn
            }
            disabled={email === "" && password === "" ? true : false}
          >
            로그인
          </button>
          <Link to="/join" className={styles.findBtn}>
            <p className={styles.forgotten}>회원이 아니시라면</p>
            <span>
              <img
                className={styles.chevron}
                src={chevron}
                width={16}
                alt="chevron"
              />
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
    </div>
  );
}
