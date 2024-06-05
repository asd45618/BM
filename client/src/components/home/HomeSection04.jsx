import React, { useEffect } from "react";
import styled from "styled-components";
import LogoGreen from "@/assets/image/logo_bm_green.png";
import CtGreen from "@/assets/image/bm_green.png";
import BhBg from "@/assets/image/bg_bm_green.jpg";
import Logoimage from "@/assets/image/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeSection04Block = styled.div`
  margin-top: 350px;
  margin-bottom: 50px;
  .HomeSection4__title {
    text-align: center;
    margin-bottom: 30px;
    h1 {
      font-family: var(--m-f-m);
      font-size: 2em;
      font-weight: 600;
      strong {
        font-size: 1.3em;
        color: var(--main);
        font-weight: normal;
      }
      .HomeSection4__imagebox {
        width: 170px;
        height: auto;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
    }
    p {
      font-family: var(--m-f-n);
      font-size: 0.9em;
      letter-spacing: -1px;
      font-weight: 500;
      color: #292929;
    }
    span {
      border-bottom: 2px solid var(--main);
      width: 40px;
      display: inline-block;
    }
  }
  .popup {
    position: relative;
    overflow: hidden;
    .popup__imagebox {
      width: 100%;
      height: 450px;
      background-attachment: fixed;
      filter: brightness(50%);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .popup__detail {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 60px;
      width: 100%;
      .popup__detail__symbol {
        width: 50px;
        height: auto;
      }
      .popup__detail__centertext {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        color: white;
        font-family: var(--m-f-n);
        h2 {
          font-weight: bold;
        }
        p {
          font-size: 0.8em;
        }
      }
      .popup__detail__logo {
        width: 120px;
        height: auto;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`;

const HomeSection04 = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);
  return (
    <HomeSection04Block>
      <div
        className="HomeSection4__title"
        data-aos="fade-down"
        data-aos-anchor-placement="top"
      >
        <h1>
          <figure className="HomeSection4__imagebox">
            <img src={LogoGreen} alt="" />
          </figure>
        </h1>
        <p>배달의 민족 친환경 프로젝트, 캠페인</p>
        <span className="under__line"></span>
      </div>
      <div className="popup" data-aos="fade-up" data-aos-anchor-placement="top">
        <figure className="popup__imagebox">
          <img src={BhBg} alt="팝업배경" />
        </figure>
        <div className="popup__detail">
          <figure className="popup__detail__symbol">
            <img src={CtGreen} alt="그린캐릭터" />
          </figure>
          <div className="popup__detail__centertext">
            <h2>
              잘먹겠습니다
              <br />잘 버리겠습니다
            </h2>
            <p>
              지구에게 전하는 작지만 큰 인사
              <br />
              배달의민족과 함께 지구에게 인사를 건네볼까요?
            </p>
          </div>
          <figure className="popup__detail__logo">
            <img src={Logoimage} alt="" />
          </figure>
        </div>
      </div>
    </HomeSection04Block>
  );
};

export default HomeSection04;
