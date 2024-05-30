import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import cn from "classnames";
import Logoimage from "@/assets/image/logo.png";
import Nav from "@/components/layout/Nav.jsx";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { userLogout } from "../../store/member";

const HeaderBlock = styled.div`
  background: var(--main);
  padding: 30px 15px;
  color: white;
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .logo {
    width: 120px;
    img {
      width: 100%;
      height: auto;
    }
    position: relative;
    z-index: 9999999;
  }

  .login {
    position: absolute;
    right: 50px;
    .logout {
      display: flex;
      align-items: center;
      p {
        margin-right: 5px;
        margin-bottom: 0;
        cursor: pointer;
      }
      svg {
        margin-left: 5px;
        cursor: pointer;
      }
    }
    a {
      margin: 0 5px;
    }
  }

  .menu-wrap {
    position: relative;
    width: 28px;
    height: 24px;
    cursor: pointer;
    z-index: 9999999;
  }
  .menu-wrap .line {
    position: absolute;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: #fff;
    left: 0;
  }
  .menu-wrap .line:first-child {
    top: 0;
    transform-origin: 25% 50%;
    transition: 0.3s;
  }
  .menu-wrap .line:nth-child(2) {
    top: calc(50% - 1.5px);
  }
  .menu-wrap .line:last-child {
    bottom: 0;
    transform-origin: 25% 50%;
    transition: 0.3s;
  }

  .menu-wrap.open .line:first-child {
    transform: rotate(45deg) translateX(29%);
  }
  .menu-wrap.open .line:nth-child(2) {
    opacity: 0;
  }
  .menu-wrap.open .line:last-child {
    transform: rotate(-45deg) translateX(25%);
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.members.user);

  const logoutClick = () => {
    dispatch(userLogout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("loging")) {
      const { userId } = JSON.parse(localStorage.getItem("loging"));
      axios
        .post("http://localhost:8001/auth/refresh", { userId })
        .then((res) => {
          dispatch(localUser(res.data[0]));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

  return (
    <HeaderBlock>
      <div className="wrap">
        <h1 className="logo">
          <Link to="/">
            <img src={Logoimage} alt="로고이미지" />
          </Link>
        </h1>
        <div className="login">
          {user ? (
            <div className="logout">
              <p onClick={logoutClick}>로그아웃</p>
              <Link to="/">
                <FontAwesomeIcon icon={faUser} /> ({user.userName})
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/join">회원가입</Link>
            </>
          )}
        </div>
        <div
          className={cn("menu-wrap", isOpen ? "open" : "")}
          onClick={toggleMenu}
        >
          <div>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>
      <Nav isOpen={isOpen} toggleMenu={toggleMenu} />
    </HeaderBlock>
  );
};

export default Header;
