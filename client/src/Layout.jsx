import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import styled from "styled-components";

const Wrap = styled.div`
  div.cover{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex; align-items:center; justify-content: center;
    @media (max-width:768px){
      display: none;
    }
  }
  div.screen{
      display: none;
      @media (max-width:768px){
        display: block;
      }
    }
  
`

const Layout = () => {
  return (
    <Wrap>
      <div className="cover">이 사이트는 768px 이하 화면에서만 보입니다.</div>
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
