import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { userLogin } from "../../store/member";
import { useNavigate } from "react-router-dom";

const LoinSectionBlock = styled.div`
  margin-top: 50px;
  h1 {
    text-align: center;
  }
  .err {
    margin-top: 5px;
    color: #f00;
    font-size: 12px;
  }
  .btn-primary {
    background: #2ac1bc;
    border: none;
  }
`;

const LoinSection = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const userIdRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/auth/login", {
        userId: userId,
        userPw: userPw,
      })
      .then((res) => {
        if (res.data[0]) {
          dispatch(userLogin(res.data[0]));
          navigate("/");
        } else {
          setErrMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
          userIdRef.current.focus();
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoinSectionBlock className="row">
      <h1>로그인</h1>
      <Form onSubmit={loginSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요."
            ref={userIdRef}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => setUserPw(e.target.value)}
          />
          <div className="err">{errMessage}</div>
        </Form.Group>
        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>
    </LoinSectionBlock>
  );
};

export default LoinSection;
