import React from "react";
import styled from "styled-components";
import Logoimage from "@/assets/image/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const FooterBlock = styled.div`
  background: var(--main);
  padding: 50px 15px;
  .footer__wrap {
    .footer__firstSection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .footer__logo {
        width: 150px;
        margin: 0;
        img {
          width: 100%;
          height: auto;
        }
        position: relative;
      }
      .footer__famailySite {
        #dropdown-basic {
          padding: 5px 25px;
          font-size: 1.5em;
          background: transparent;
          border: 1px solid #fff;
          z-index: 0;
        }
      }
    }
    .footer__secondSection {
      .footer__list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        margin: 0;
        li {
          a {
            font-family: "Do Hyeon", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 1.5em;
            font-weight: normal;
          }
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div className="footer__wrap">
        <div className="footer__firstSection">
          <h1 className="footer__logo">
            <img src={Logoimage} alt="" />
          </h1>
          <div className="footer__famailySite">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                familySite
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="footer__secondSection">
          <ul className="footer__list">
            <li>
              <Link to="/">회사소개</Link>
            </li>
            <li>
              <Link to="/">서비스</Link>
            </li>
            <li>
              <Link to="/">오시는길</Link>
            </li>
            <li>
              <Link to="/">고객센터</Link>
            </li>
          </ul>
        </div>
      </div>
    </FooterBlock>
  );
};

export default Footer;
