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

  const [Email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

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

  // 회원가입 버튼 클릭, 기입한 정보가 올바르지 않으면 전송 막고 올바르면 유저정보 전송
  const submitButton = (e) => {
    e.preventDefault();

    if (!isNicknameValid || !isEmailValid || !isPasswordValid || !isPasswordDoubleValid) {
      alert("Please enter valid information.");
      return;
    }
    const userData = {
      nickName: Nickname,
      user_id: Email,
      password: Password, // 평문 비밀번호 전송
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration completed", data);
        // 회원가입이 성공하면 로컬 스토리지에 정보 저장
        /* localStorage.setItem("Email", Email);
        localStorage.setItem("Password", Password);
        localStorage.setItem("Nickname", Nickname); */
        alert("Congratulations")
        navigate("/Login");
      })      
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div className={styles.RegisterForm}>
        <Form className="w-100">
          <h2 className={styles.RegisterFormH2}>Sign in</h2>
          <Form.Group className="inputForm mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              name="Nickname"
              value={Nickname}
              onChange={nicknameHandler}
            />
            {errorNickname && <p className="text-danger">{errorNickname}</p>}
          </Form.Group>
          <Form.Group className="inputForm mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={Email}
              onChange={emailHandler}
            />
            {errorEmail && <p className="text-danger">{errorEmail}</p>}
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