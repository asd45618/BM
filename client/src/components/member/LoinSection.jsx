import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { userLogin } from "../../store/member";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const LoinSectionBlock = styled.div`
  margin: 150px 0 50px;
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
  .form-control {
    padding: 15px;
    border: none;
    background: #f5f5f5;
    border: 1px solid white;
    &:focus {
      border: 1px solid var(--main);
      box-shadow: none;
      background: #fff;
    }
  }
  .Login__btn {
    justify-content: center;
    margin-top: 50px;
    .btn-primary {
      width: 100%;
      border: 1px solid var(--main);
      background: transparent;
      color: var(--main);
      font-family: var(--m-f-n);
      font-weight: 600;
      font-size: 1.3em;
      padding: 10px 30px;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      &:hover {
        background: var(--main);
        color: white;
      }
    }
  }
  .Login__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    P {
      font-size: 5em;
      color: var(--main);
    }
    h1 {
      font-size: 3em;
      font-family: var(--m-f-n);
      font-weight: 400;
      color: #424242;
    }
  }
  .joinLink {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    &:hover {
      span {
        transform: translateX(20px);
        color: var(--main);
      }
      p {
        color: var(--main);
        border-color: var(--main);
      }
    }

    p {
      font-weight: bold;
      color: #757575;
      font-family: var(--m-f-n);
      border-bottom: 1px solid #757575;
      font-size: 1em;
      margin: 0;
      transition: all 0.3s ease;
    }
    span {
      display: inline-block;
      transform: translateX(10px);
      color: #757575;
      transition: all 0.3s ease;
    }
  }
`;

const serverUrl = import.meta.env.VITE_API_URL;

const LoinSection = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [lock, setLock] = useState(false);

  const userIdRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${serverUrl}/auth/login`, {
        userId: userId,
        userPw: userPw,
      })
      .then((res) => {
        if (res.data[0]) {
          setLock(true);
          setTimeout(() => {
            dispatch(userLogin(res.data[0]));
            navigate("/");
          }, 200);
        } else {
          setErrMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
          userIdRef.current.focus();
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <LoinSectionBlock
      className="row"
      data-aos="zoom-out-up"
      data-aos-anchor-placement="top-bottom"
    >
      {!lock ? (
        <div className="Login__text">
          <p>
            <FaLock />
          </p>
          <h1>로그인</h1>
        </div>
      ) : (
        <div className="Login__text">
          <p>
            <FaUnlockAlt />
          </p>
          <h1>환영합니다!</h1>
        </div>
      )}

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
        <div className="Login__btn">
          <Button variant="primary" type="submit">
            로그인
          </Button>
        </div>
      </Form>
      <Link to="/join" className="joinLink">
        <p>회원가입 하러 가기</p>
        <span>
          <FaArrowRightLong />
        </span>
      </Link>
    </LoinSectionBlock>
  );
};

export default LoinSection;
