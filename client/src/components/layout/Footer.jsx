import React from "react";
import styled from "styled-components";
import Logoimage from "@/assets/image/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";

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
        .dropdown-item {
          padding: 10px;
          font-family: var(--m-f-m);
          font-size: var(--m-f-s);
          font-weight: var(--m-f-w);

          &:hover {
            background: #f3f3f3;
            color: var(--main);
          }
        }
        .dropdown-menu.show {
          opacity: 1;
        }
      }
    }
    .footer__secondSection {
      .footer__list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        padding-top: 80px;
        border-bottom: 1px solid #fff;

        li {
          a {
            font-family: "Do Hyeon", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 1.5em;
            font-weight: normal;
            color: white;
            padding-bottom: 30px;
          }
        }
      }
    }
    .footer__thirdSection {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .footer__copy {
        span {
          display: block;
          font-size: 0.8em;
          color: white;
          font-family: "Noto Sans KR", sans-serif;
          font-optical-sizing: auto;
          font-weight: bold;
          font-style: normal;
          padding: 5px 0;
        }
      }
      .footer__sns {
        display: flex;
        justify-content: right;
        margin: 50px 0;
        a {
          display: inline-block;
          font-size: 2em;
          color: white;
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
                <Dropdown.Item href="https://www.woowahan.com/" target="_blank">
                  우아한형제들
                </Dropdown.Item>
                <Dropdown.Item
                  href="https://www.deliveryhero.com/"
                  target="_blank"
                >
                  deliveryhero
                </Dropdown.Item>
                <Dropdown.Item
                  href="https://www.woowayouths.com/"
                  target="_blank"
                >
                  우아한청년들
                </Dropdown.Item>
                <Dropdown.Item href="https://woowarider.or.kr/" target="_blank">
                  우아한 라이더 살핌
                </Dropdown.Item>
                <Dropdown.Item
                  href="https://woowasajangnim.or.kr/"
                  target="_blank"
                >
                  우아한 사장님 살핌
                </Dropdown.Item>
                <Dropdown.Item
                  href="https://woowa.janghak.org/"
                  target="_blank"
                >
                  우아한 사장님 자녀 장학금 지원
                </Dropdown.Item>
                <Dropdown.Item
                  href="https://baemin.dosirak.or.kr/"
                  target="_blank"
                >
                  배민방학도시락
                </Dropdown.Item>
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
        <div className="footer__thirdSection">
          <div className="footer__copy">
            <span>(주)우아한형제들</span>
            <span>
              사업자 등록번호:120-87-65763 &#124; 대표: 이국환 &#124; 주소:
              서울시 송파구
            </span>
            <span>위례성대로 2 (방이동, 장은빌딩)</span>
          </div>
          <div className="footer__sns">
            <a href="" className="facebook">
              <CiFacebook />
            </a>
            <a href="" className="instargram">
              <CiInstagram />
            </a>
            <a href="" className="x">
              <CiTwitter />
            </a>
          </div>
        </div>
      </div>
    </FooterBlock>
  );
};

export default Footer;
