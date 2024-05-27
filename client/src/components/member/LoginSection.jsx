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
    <LoginSectionBlock>
      <Form onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="userId"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="userPw"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="userName"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasiczipCode">
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="zipCode"
            name="zipCode"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicaddr1">
          <Form.Label>addr1</Form.Label>
          <Form.Control
            type="text"
            placeholder="addr1"
            name="addr1"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicaddr2">
          <Form.Label>addr2</Form.Label>
          <Form.Control
            type="text"
            placeholder="addr2"
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
