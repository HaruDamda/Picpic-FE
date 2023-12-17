import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Join.module.scss";
// import api from "../../apis/api";
import { onSignUp } from "../../apis/onSignUp";
import { emailCheck } from "../../apis/emailCheck";

export default function SignUp() {
  const initialState = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  };

  // 가입 작성 폼 초기화
  const [formData, setFormData] = useState(initialState);

  // 에러 메시지 통합
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  // 유효성 검사 통합
  const [isValid, setIsValid] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });

  const [allCheck, setAllCheck] = useState(false);

  // 체크박스 로직 통합
  const [checkStates, setCheckStates] = useState({
    checkState1: false,
    checkState2: false,
    checkState3: false,
    checkState4: false,
  });

  const checkDescriptions = {
    checkState1: "만 14세 이상입니다 (필수)",
    checkState2: "원아워 이용약관에 동의합니다 (필수)",
    checkState3: "원아워 개인정보 수집 및 이용에 동의합니다 (필수)",
    checkState4: "광고성 SNS, 이메일 뉴스레터 수신에 동의합니다 (선택)",
  };

  // 라우터 설정
  const router = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  // 각각의 유효성 검사를 하나의 함수로 묶음
  const validateInput = (name, value) => {
    let emailRegex,
      isEmailValid,
      isNicknameValid,
      passwordRegex,
      isPasswordValid,
      isPasswordConfirmValid;
    switch (name) {
      case "email":
        emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        isEmailValid = emailRegex.test(value) || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          email: isEmailValid ? "" : "올바른 이메일을 입력해주세요",
        });
        setIsValid({ ...isValid, email: isEmailValid });
        break;
      case "nickname":
        isNicknameValid =
          (value.length >= 2 && value.length <= 16) || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          nickname: isNicknameValid
            ? ""
            : "2글자 이상 16글자 이하로 입력해주세요",
        });
        setIsValid({ ...isValid, nickname: isNicknameValid });
        break;
      case "password":
        passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
        isPasswordValid = passwordRegex.test(value) || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          password: isPasswordValid
            ? ""
            : "숫자+영문자 조합으로 8자리 이상 입력해주세요!",
        });
        setIsValid({ ...isValid, password: isPasswordValid });
        break;
      case "passwordConfirm":
        isPasswordConfirmValid =
          value === formData.password || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          passwordConfirm: isPasswordConfirmValid
            ? ""
            : "비밀번호가 일치하지 않습니다.",
        });
        setIsValid({ ...isValid, passwordConfirm: isPasswordConfirmValid });
        break;
      default:
        break;
    }
  };

  // 체크박스 로직 중 전체선택
  const toggleAllCheck = () => {
    const newAllCheck = !allCheck;
    setAllCheck(newAllCheck);
    setCheckStates({
      checkState1: newAllCheck,
      checkState2: newAllCheck,
      checkState3: newAllCheck,
      checkState4: newAllCheck,
    });
  };

  const toggleCheck = (name) => {
    const newCheckStates = {
      ...checkStates,
      [name]: !checkStates[name],
    };
    setCheckStates(newCheckStates);

    // 전체 동의 체크 여부 확인
    const allChecked = Object.values(newCheckStates).every((state) => state);
    setAllCheck(allChecked);
  };

  // 회원가입 버튼 비활성화 조건
  const isSubmitDisabled = !(
    isValid.email &&
    isValid.nickname &&
    isValid.password &&
    isValid.passwordConfirm &&
    checkStates.checkState1 &&
    checkStates.checkState2 &&
    checkStates.checkState3
  );

  return (
    <div className={styles.loginContainer}>
      <div className={styles.signUpBox}>
        <div className={styles.header}>
          <Link to="/login">
            <button className={styles.closeBtn}>취소</button>
          </Link>
          <h4>회원가입</h4>
          <div></div>
        </div>
        <div className={styles.body}>
          <div>
            <h5>이메일</h5>
            <div className={styles.emailWrapper}>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className={
                  isValid.email || formData.email === ""
                    ? styles.emailInputBox
                    : styles.emailInputBox1
                }
                placeholder="이메일을 입력해주세요"
              ></input>
              <button
                className={styles.emailCheck}
                onClick={() => {
                  emailCheck(formData,setFormData);
                }}
              >
                중복확인
              </button>
            </div>
            {errorMessages.email && (
              <span className={`message error`}>{errorMessages.email}</span>
            )}
          </div>
          <div className={styles.boxWrapper}>
            <h5>닉네임</h5>
            <input
              className={
                isValid.nickname || formData.nickname === ""
                  ? styles.inputBox
                  : styles.inputBox1
              }
              onChange={handleChange}
              name="nickname"
              placeholder="닉네임을 입력해주세요"
            ></input>
            {errorMessages.nickname && (
              <span className={`message error`}>{errorMessages.nickname}</span>
            )}
          </div>
          <div className={styles.boxWrapper}>
            <h5>비밀번호</h5>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              className={
                isValid.password || formData.password === ""
                  ? styles.inputBox
                  : styles.inputBox1
              }
              placeholder="비밀번호를 입력해주세요"
            ></input>
            {errorMessages.password && <span>{errorMessages.password}</span>}
            <input
              name="passwordConfirm"
              onChange={handleChange}
              type="password"
              className={
                isValid.passwordConfirm || formData.passwordConfirm === ""
                  ? styles.inputBox
                  : styles.inputBox1
              }
              placeholder="비밀번호를 다시 한번 입력해주세요"
            ></input>
            {errorMessages.passwordConfirm && (
              <span className={`message error`}>
                {errorMessages.passwordConfirm}
              </span>
            )}
          </div>

          <div className={styles.agreeForm1}>
            <div className={styles.allWrapper}>
              <input
                type="checkbox"
                id="all-check"
                checked={allCheck}
                onChange={toggleAllCheck}
              ></input>
              <h5>전체 동의</h5>
            </div>
            <hr />
          </div>

          {/* 체크박스 로직 map함수로 뿌려줌 */}
          {Object.keys(checkStates).map((checkStateName) => (
            <div className={styles.agreeForm2} key={checkStateName}>
              <input
                type="checkbox"
                id={checkStateName}
                checked={checkStates[checkStateName]}
                onChange={() => toggleCheck(checkStateName)}
              ></input>
              <h5>{checkDescriptions[checkStateName]}</h5>
            </div>
          ))}

          <button
            type="submit"
            onClick={() => {
              onSignUp(formData, router);
            }}
            className={isSubmitDisabled ? styles.signUpBtn0 : styles.signUpBtn1}
            disabled={isSubmitDisabled}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
