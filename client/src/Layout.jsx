import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import styled from "styled-components";
import GifImage from "@/assets/image/768_ani.gif";

const Wrap = styled.div`
  div.cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-family: "Do Hyeon", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.8em;
    strong {
      font-size: 2em;
      color: var(--main);
    }
    letter-spacing: 1px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  div.screen {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const Layout = () => {
  return (
    <Wrap>
      <div className="cover">
        <img src={GifImage} alt="gif이미지" />이 사이트는 <strong>768px</strong>{" "}
        이하 화면에서만 보입니다.
      </div>
      <div className="screen">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Wrap>
  );
};

export default Layout;
