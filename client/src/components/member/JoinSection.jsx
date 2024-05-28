import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import axios from "axios";

const LoginSectionBlock = styled.div`
  input {
    border: 1px solid #ddd;
  }
`;

const LoginSection = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userName: "",
    zipCode: "",
    addr1: "",
    addr2: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const register = () => {
    e.preventDefault();

    const addMember = {
      userId: userInfo.userId,
      userPw: userInfo.userPw,
      userName: userInfo.userName,
      zipCode: userInfo.zipCode,
      addr1: userInfo.addr1,
      addr2: userInfo.addr2,
    };

    axios
      .post("http://localhost:8001/auth/join", { addMember })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert("회원가입이 완료되었습니다.");
        } else {
          alert("회원가입에 실패했습니다.");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginSectionBlock className="row">
      <h1>회원가입</h1>
      <Form onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요."
            name="userId"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요."
            name="userPw"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="닉네임을 입력하세요."
            name="userName"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasiczipCode">
          <Form.Label>우편번호</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="zipCode"
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicaddr1">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            name="addr1"
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicaddr2">
          <Form.Label>상세주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="상세주소를 입력하세요."
            name="addr2"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </LoginSectionBlock>
  );
};

export default LoginSection;
