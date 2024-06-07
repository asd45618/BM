import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const LoginSectionBlock = styled.div`
  margin: 150px 0 50px;
  h1 {
    text-align: center;
  }
  .btn-primary {
    background: #2ac1bc;
    border: none;
  }

  .dupliErr {
    color: red;
    font-size: 12px;
  }

  .postCode {
    display: flex;
    flex-wrap: wrap;
    input {
      flex: 0 0 30%;
      margin-right: 10px;
    }
  }

  input {
    border: 1px solid #ddd;
    &.err {
      border-color: #f00;
    }
  }
  .join__text {
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
  .btn-secondary {
    background: transparent;
    color: #6c757d;
    border: 1px solid #6c757d;
    font-family: var(--m-f-n);
    font-weight: bold;
    &:hover {
      background: #6c757d;
      color: white;
    }
  }
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
    margin-top: 50px;

    &:hover {
      background: var(--main);
      color: white;
    }
  }
`;

const serverUrl = import.meta.env.VITE_API_URL;

const LoginSection = () => {
  const navigate = useNavigate();

  const userIdRef = useRef("");
  const userPwRef = useRef("");
  const userPwOkRef = useRef("");
  const userNameRef = useRef("");
  const mZipcodeRef = useRef("");
  const mAddressRef = useRef("");
  const mAddressSubRef = useRef("");

  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwOkMessage, setPwOkMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userPwOk: "",
    userName: "",
    zipCode: "",
    addr1: "",
    addr2: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const register = (e) => {
    e.preventDefault();

    // input 창에 값이 비어있거나 비밀번호가 일치하지 않으면 에러메세지 저장
    if (!userInfo.userId) {
      setIdMessage("이메일을 입력해주세요.");
      userIdRef.current.focus();
      return;
    }
    if (!userInfo.userPw) {
      setPwMessage("비밀번호를 입력해주세요.");
      userPwRef.current.focus();
      return;
    }
    if (!userInfo.userPwOk) {
      setPwOkMessage("비밀번호를 입력해주세요.");
      userPwOkRef.current.focus();
      return;
    }
    if (userInfo.userPw !== userInfo.userPwOk) {
      setPwOkMessage("비밀번호가 일치하지 않습니다.");
      userPwOkRef.current.focus();
      return;
    }
    if (!userInfo.userName) {
      alert("닉네임을 입력해주세요.");
      userNameRef.current.focus();
      return;
    }
    // 이메일이나 닉네임이 중복이 되면 해당하는 input창에 focus
    if (idMessage || nameMessage) {
      idMessage ? userIdRef.current.focus() : userNameRef.current.focus();
      return;
    }

    const addMember = {
      userId: userInfo.userId,
      userPw: userInfo.userPw,
      userName: userInfo.userName,
      zipCode: userInfo.zipCode,
      addr1: userInfo.addr1,
      addr2: userInfo.addr2,
    };

    axios
      .post(`${serverUrl}/auth/join`, { addMember })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert("회원가입이 완료되었습니다.");
        } else {
          alert("");
          return;
        }
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // 이메일 중복 체크
  const idCheck = (value) => {
    value
      ? axios
          .post(`${serverUrl}/auth/idcheck`, { userId: value })
          .then((res) => {
            res.data[0]
              ? setIdMessage("중복된 이메일입니다.")
              : setIdMessage("");
          })
          .catch((err) => console.log(err))
      : setIdMessage("이메일을 입력해주세요.");
  };

  // 닉네임 중복 체크
  const nameCheck = (value) => {
    value
      ? axios
          .post(`${serverUrl}/auth/namecheck`, { userName: value })
          .then((res) => {
            res.data[0]
              ? setNameMessage("중복된 닉네임입니다.")
              : setNameMessage("");
          })
          .catch((err) => console.log(err))
      : setNameMessage("닉네임을 입력해주세요.");
  };

  useEffect(() => {
    window.openDaumPostcode = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullAddr = ""; // 최종 주소 변수
          let extraAddr = ""; // 조합형 주소 변수
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "") {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
          }
          // 주소 정보를 입력 요소에 설정
          setUserInfo((prevState) => ({
            ...prevState,
            zipCode: data.zonecode,
            addr1: fullAddr,
          }));
          mAddressSubRef.current.focus();
        },
      }).open();
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <LoginSectionBlock
      className="row"
      data-aos="zoom-out-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="join__text">
        <p>
          <FaUserPlus />
        </p>
        <h1>회원가입</h1>
      </div>
      <Form onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력해주세요."
            name="userId"
            ref={userIdRef}
            onChange={handleChange}
            onBlur={(e) => idCheck(e.target.value)}
            className={idMessage ? "err" : ""}
          />
          <div className="dupliErr">{idMessage}</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="userPw"
            ref={userPwRef}
            onChange={handleChange}
            onBlur={() =>
              userInfo.userPw
                ? setPwMessage("")
                : setPwMessage("비밀번호를 입력해주세요.")
            }
            className={pwMessage ? "err" : ""}
          />
          <div className="dupliErr">{pwMessage}</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordOk">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="userPwOk"
            ref={userPwOkRef}
            onChange={handleChange}
            onBlur={() =>
              userInfo.userPwOk
                ? setPwOkMessage("")
                : setPwOkMessage("비밀번호를 입력해주세요.")
            }
            className={pwOkMessage ? "err" : ""}
          />
          <div className="dupliErr">{pwOkMessage}</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임을 입력해주세요."
            name="userName"
            ref={userNameRef}
            onChange={handleChange}
            onBlur={(e) => nameCheck(e.target.value)}
            className={nameMessage ? "err" : ""}
          />
          <div className="dupliErr">{nameMessage}</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasiczipCode">
          <Form.Label>우편번호</Form.Label>
          <div className="postCode">
            <Form.Control
              type="text"
              placeholder=""
              name="zipCode"
              ref={mZipcodeRef}
              value={userInfo.zipCode}
              onChange={handleChange}
              disabled
            />
            <Button
              variant="secondary"
              onClick={window.openDaumPostcode}
              type="button"
            >
              우편번호
            </Button>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicaddr1">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="addr1"
            ref={mAddressRef}
            value={userInfo.addr1}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicaddr2">
          <Form.Label>상세주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="상세주소를 입력해주세요."
            name="addr2"
            ref={mAddressSubRef}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
    </LoginSectionBlock>
  );
};

export default LoginSection;
