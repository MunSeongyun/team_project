import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styles from "../css/Register.module.css";

const Signin = () => {
  const navigate = useNavigate();

  const [Nickname, setNickname] = useState(""); // 사용자가 입력한 닉네임을 저장
  const [errorNickname, setErrorNickname] = useState(""); // 닉네임 입력과 관련된 오류 메시지를 저장
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임이 유효한지 여부를 나타냄
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 체크 여부

  const [Email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 체크 여부

  const [Password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [PasswordDouble, setPasswordDouble] = useState("");
  const [errorPasswordDouble, setErrorPasswordDouble] = useState("");
  const [isPasswordDoubleValid, setIsPasswordDoubleValid] = useState(false);

  // 닉네임 체크
  const nicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
    const nicknameRegex = /^[a-zA-Z가-힣0-9]{3,10}$/; // 닉네임 정규식

    if (nicknameRegex.test(e.currentTarget.value)) {
      setIsNicknameValid(true);
      setErrorNickname("");
    } else {
      setErrorNickname("Please enter the nickname in 3 to 10");
      setIsNicknameValid(false);
    }
    setIsNicknameChecked(false); // 닉네임이 변경될 때마다 중복 체크 여부를 초기화
  };

  // 이메일 체크
  const emailHandler = (e) => {
    setEmail(e.currentTarget.value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 정규식

    if (emailRegex.test(e.currentTarget.value)) {
      setErrorEmail("");
      setIsEmailValid(true);
    } else {
      setErrorEmail("Please enter right email");
      setIsEmailValid(false);
    }
    setIsEmailChecked(false); // 이메일이 변경될 때마다 중복 체크 여부를 초기화
  };

  // 패스워드 체크
  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/; // 패스워드 체크 정규식 (영문 숫자 포함 6자리 이상)

    if (passwordRegex.test(e.currentTarget.value)) {
      setErrorPassword("");
      setIsPasswordValid(true);
    } else {
      setErrorPassword("The password must be at least 6 digits including English numbers");
      setIsPasswordValid(false);
    }
  };

  // 패스워드 확인 체크
  const passwordDoubleHandler = (e) => {
    setPasswordDouble(e.currentTarget.value);
  };

  // 패스워드와 패스워드 확인이 같은지 확인
  useEffect(() => {
    if (Password === PasswordDouble) {
      setErrorPasswordDouble("");
      setIsPasswordDoubleValid(true);
    } else {
      setErrorPasswordDouble("Password is not match");
      setIsPasswordDoubleValid(false);
    }
  }, [Password, PasswordDouble]);

  // 기존 유저 데이터 가져오기
  const getUserData = async () => {
    const usersResponse = await fetch(`http://localhost:5000/users`);
    const usersData = await usersResponse.json();
    return usersData;
  };

  // 닉네임 중복 체크
  const checkNickname = async () => {
    if (!isNicknameValid) {
      alert("Please enter a valid nickname before checking.");
      return;
    }

    try {
      const usersData = await getUserData();
      const isNicknameDuplicate = usersData.some(user => user.nickName === Nickname);

      if (isNicknameDuplicate) {
        setErrorNickname("Nickname is already taken. Please choose a different nickname.");
        setIsNicknameValid(false);
      } else {
        setErrorNickname("Nickname is available.");
        setIsNicknameValid(true);
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("Error checking nickname", error);
    }
  };

  // 이메일 중복 체크
  const checkEmail = async () => {
    if (!isEmailValid) {
      alert("Please enter a valid email before checking.");
      return;
    }

    try {
      const usersData = await getUserData();
      const isEmailDuplicate = usersData.some(user => user.user_id === Email);

      if (isEmailDuplicate) {
        setErrorEmail("Email is already registered. Please use a different email.");
        setIsEmailValid(false);
      } else {
        setErrorEmail("Email is available.");
        setIsEmailValid(true);
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error("Error checking email", error);
    }
  };

  // 회원가입 버튼 클릭, 기입한 정보가 올바르지 않으면 전송 막고 올바르면 유저정보 전송
  const submitButton = async (e) => {
    e.preventDefault();

    if (!isNicknameValid || !isEmailValid || !isPasswordValid || !isPasswordDoubleValid || !isNicknameChecked || !isEmailChecked) {
      alert("Please enter valid information and check nickname/email duplication.");
      return;
    }

    const userData = {
      nickName: Nickname,
      user_id: Email,
      password: Password, // 평문 비밀번호 전송
    };

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration completed", data);
        alert("Congratulations");
        navigate("/Login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("회원가입 중 에러 발생", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div className={styles.RegisterForm}>
        <Form className="w-100">
          <h2 className={styles.RegisterFormH2}>Sign in</h2>
          <Form.Group className="inputForm mb-3">
            <Form.Label>Nickname</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="Nickname"
                value={Nickname}
                onChange={nicknameHandler}
              />
              <Button variant="dark" onClick={checkNickname} className="ms-2">
                Check
              </Button>
            </div>
            {errorNickname && (
              <p className={errorNickname === "Nickname is available." ? "text-primary" : "text-danger"}>
                {errorNickname}
              </p>
            )}
          </Form.Group>
          <Form.Group className="inputForm mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="email"
                name="email"
                value={Email}
                onChange={emailHandler}
              />
              <Button variant="dark" onClick={checkEmail} className="ms-2">
                Check
              </Button>
            </div>
            {errorEmail && (
              <p className={errorEmail === "Email is available." ? "text-primary" : "text-danger"}>
                {errorEmail}
              </p>
            )}
          </Form.Group>
          <Form.Group className="inputForm mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={Password}
              onChange={passwordHandler}
            />
            {errorPassword && <p className="text-danger">{errorPassword}</p>}
          </Form.Group>
          <Form.Group className="inputForm mb-3">
            <Form.Label>Check your password</Form.Label>
            <Form.Control
              type="password"
              name="PasswordDouble"
              value={PasswordDouble}
              onChange={passwordDoubleHandler}
            />
            {errorPasswordDouble && (
              <p className="text-danger">{errorPasswordDouble}</p>
            )}
          </Form.Group>

          <div className="d-grid gap-2 font-weight-bold mt-3">
            <Button variant="dark" size="lg" onClick={submitButton}>
              Join
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signin;