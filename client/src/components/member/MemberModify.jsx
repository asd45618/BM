import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { localUser } from "../../store/member";

const MemberModifyBlock = styled.div`
  margin: 50px 0;

  .dupliErr {
    color: red;
    font-size: 12px;
  }

  input {
    border: 1px solid #ddd;
    &.err {
      border-color: #f00;
    }
  }
`;

const MemberModify = () => {
  const user = useSelector((state) => state.members.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pwMessage, setPwMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    userId: user.userId,
    userPw: "",
    userName: user.userName,
    zipCode: user.zipCode,
    addr1: user.addr1,
    addr2: user.addr2,
  });

  const userPwRef = useRef("");
  const userNameRef = useRef("");
  const mAddressSubRef = useRef("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const modify = (e) => {
    e.preventDefault();
    if (pwMessage || !userInfo.userPw) {
      setPwMessage("비밀번호를 확인해주세요.");
      userPwRef.current.focus();
      return false;
    }
    if (nameMessage) {
      userNameRef.current.focus();
      return false;
    }
    axios
      .post("http://localhost:8001/auth/modify", { userInfo })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert("정보가 수정되었습니다.");
          dispatch(localUser(JSON.parse(res.config.data).userInfo));
          navigate("/");
        } else {
          alert("정보가 수정되지 않았습니다.");
        }
      });
  };

  const nameCheck = (value) => {
    value
      ? axios
          .post("http://localhost:8001/auth/namecheck", { userName: value })
          .then((res) => {
            if (res.data[0]?.userName === user.userName || !res.data[0]) {
              setNameMessage("");
            } else if (res.data[0].userName !== user.userName && res.data[0]) {
              setNameMessage("중복된 닉네임입니다.");
            }
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

  return (
    <MemberModifyBlock className="row">
      <Form onSubmit={modify}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            name="userId"
            value={user.userId}
            disabled
          />
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
              userInfo.userPw === user.userPw
                ? setPwMessage("")
                : setPwMessage("비밀번호를 확인해주세요.")
            }
            className={pwMessage ? "err" : ""}
          />
          <div className="dupliErr">{pwMessage}</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임을 입력해주세요."
            name="userName"
            value={userInfo.userName}
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
            value={userInfo.addr2}
            ref={mAddressSubRef}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          정보 수정
        </Button>
      </Form>
    </MemberModifyBlock>
  );
};

export default MemberModify;
