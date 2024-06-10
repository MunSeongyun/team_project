import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import styles from "../css/Register.module.css";

const Login = (props) => {
  const setUser = props.setUser;
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  // db에서 유저정보 받아오기
  const getUserData = async () => {
    const usersResponse = await fetch(`http://localhost:5000/users`);
    const usersData = await usersResponse.json();

    const combinedData = {
      users: [...usersData],
    };
    return combinedData;
  };

  // 받아온 유저정보로 로그인
  const handleLogin = async () => {
    try {
      const combinedData = await getUserData();

      if (combinedData && combinedData.users.length > 0) {
        const loggedInUser = combinedData.users.find(
          (user) => user.user_id === Email && user.password === Password
        );

        if (loggedInUser) {
          // 로그인 성공
          // 로컬 스토리지에 유저 정보 저장
          /* localStorage.setItem("Email", loggedInUser.user_id);
          localStorage.setItem("Nickname", loggedInUser.nickName);
          localStorage.setItem("UserId", loggedInUser.id) */;
          // 세션 스토리지에 유저 정보 저장
          sessionStorage.setItem("Email", loggedInUser.user_id);
          sessionStorage.setItem("Nickname", loggedInUser.nickName);
          sessionStorage.setItem("UserId", loggedInUser.id);
          setUser(loggedInUser.nickName);
          
          navigate("/");
        } else {
          // 이메일 혹은 비밀번호 불일치
          alert("Check your e-mail or password");
        }
      }
    } catch (error) {
      console.error("로그인 중 에러 발생", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <div className={styles.RegisterForm}>
        <Form className="w-100">
         <h2 className={styles.RegisterFormH2}>Log in</h2>
          <Form.Group className="inputForm mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={Email}
              onChange={emailHandler}
              placeholder="Enter your Email"
            />
          </Form.Group>
          <Form.Group className="inputForm mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={Password}
              onChange={passwordHandler}
              placeholder="Enter your password"
            />
          </Form.Group>
          <div className="d-grid gap-2 font-weight-bold">
            <Button variant="dark" size="lg" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="mt-3">
            <a href="/Signin">Make your Email</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;