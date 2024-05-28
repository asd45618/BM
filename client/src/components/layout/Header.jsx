import React, {useState} from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import cn from "classnames";
import Logoimage from '@/assets/image/logo.png'
import Nav from "@/components/layout/Nav.jsx";




const HeaderBlock = styled.div`
background: var(--main);
padding: 30px 15px;
color: white;
.wrap{
  display: flex;
justify-content: space-between;
align-items: center;
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
      transform: rotate(45deg) translateX(25%);
    }
    .menu-wrap.open .line:nth-child(2) {
      opacity: 0;
    }
    .menu-wrap.open .line:last-child {
      transform: rotate(-45deg) translateX(25%);
    }
`

const Header = () => {
  const [isOpen,setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return <HeaderBlock>
    <div className="wrap">
          <h1 className="logo">
          <Link to="/">
            <img src={Logoimage} alt="로고이미지" />
          </Link>
          </h1>
          <div
            className={cn("menu-wrap", isOpen ? "open" : "")}
            onClick={toggleMenu}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          </div>
          <Nav isOpen={isOpen} toggleMenu={toggleMenu}/>
        </HeaderBlock>;
          

       
};    

export default Header;
