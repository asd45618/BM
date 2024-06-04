import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Section1Img from "@/assets/image/AboutUs_bg.jpg";
import cn from "classnames";
import RiderImg from "@/assets/image/AboutUs_rider_button.png";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa6";
import AboutIco01 from "@/assets/image/aboutUs_ico_01.gif";
import AboutIco02 from "@/assets/image/aboutUs_ico_02.png";
import AboutIco03 from "@/assets/image/aboutUs_ico_03.png";
import AboutIco04 from "@/assets/image/aboutUs_ico_04.png";
import AboutIco05 from "@/assets/image/aboutUs_ico_05.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const AboutUsSectionBlock = styled.div`
  margin-top: 106px;
  overflow: hidden;
  position: relative;
  scroll-behavior: smooth; /* 부드러운 스크롤을 위해 추가 */
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? "white" : "rgba(255, 255, 255, 0.5)"};
`;

const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main);
  transition: opacity 0.8s ease-in-out;
  margin: 100px 0;
  .AS {
    font-family: var(--m-f-m);
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    color: white;
    justify-content: center;
    .under__line {
      border-bottom: 2px solid white;
      width: 40px;
      display: inline-block;
      margin: 30px 0;
    }
    h1 {
      font-size: 4em;
    }
    p {
      font-size: 1.5em;
    }
    figure {
      width: 350px;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  &:first-child {
    position: relative;
    margin: 0;
  }
  h1 {
    color: white;
  }
  .AboutUsSection__riderimgbox {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: auto;
    z-index: 99;
  }
  .AboutUsSection__section0 {
    .AboutUsSection__imgbox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: brightness(0.9);
        opacity: 0.2;
        transform: scale(1);
        transition: all 0.8s ease;
        &.on {
          opacity: 1;
          transform: scale(1.5);
        }
      }
      .dem {
        position: absolute;
        background: black;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.5;
      }
    }

    .AboutUsSection0__textbox {
      font-family: var(--m-f-m);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      h1 {
        font-size: 6em;
        opacity: 0;
        transform: scale(0.2);
        transition: all 0.8s ease;

        &.on {
          opacity: 1;
          transform: scale(1);
        }
      }
      .AboutUsSection__btn {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        opacity: 0;
        transform: scale(0);
        transition: all 0.8s 0.2s ease;

        &.on {
          opacity: 1;
          transform: scale(1);
        }
        a {
          display: flex;
          padding: 10px 20px;
          border: 1px solid #fff;
          font-size: 1.2em;
          border-radius: 10px;
          letter-spacing: 2px;
          align-items: center;
          transition: all 0.3s ease;
          span {
            padding-right: 10px;
            font-size: 1.5em;
          }
          &:nth-child(1):hover {
            background: #1665e1;
            border: 1px solid #1665e1;
          }
          &:nth-child(2):hover {
            background: #ffaa00;
            border: 1px solid #ffaa00;
          }
        }
      }
    }
  }
  .AboutUsSection__section2 {
    padding: 130px 0;
  }
`;

const AboutUsSection = () => {
  const [ani, setAni] = useState(false);
  React.useEffect(() => {
    gsap.utils.toArray(".textbox").forEach((selector) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: selector,
            start: "100% 100%",
            end: "100% 100%",
            scrub: 1,
            // markers: true,
          },
        })
        .fromTo(
          selector,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, ease: "none", duration: 7 },
          0
        );
    });
  }, []);
  React.useEffect(() => {
    gsap.utils.toArray(".Ai").forEach((selector) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: selector,
            start: "100% 100%",
            end: "100% 100%",
            scrub: 1,
            // markers: true,
          },
        })
        .fromTo(
          selector,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, ease: "none", duration: 7 },
          0
        );
    });
  }, []);

  useEffect(() => {
    setAni(true);
  }, []);

  return (
    <div>
      <AboutUsSectionBlock>
        <Section>
          <figure className="AboutUsSection__riderimgbox">
            <a href="https://join.baeminconnect.com/" target="_blank">
              <img src={RiderImg} alt="" />
            </a>
            <div className="dem"></div>
          </figure>
          <div className="AboutUsSection__section0">
            <figure className="AboutUsSection__imgbox">
              <img src={Section1Img} alt="" className={ani && "on"} />
              <div className="dem"></div>
            </figure>

            <div className={cn("AboutUsSection0__textbox", "AS")}>
              <h1 className={ani && "on"}>마음에도 당충전이 필요할때</h1>
              <div className={cn("AboutUsSection__btn", ani && "on")}>
                <a
                  href="https://apps.apple.com/kr/app/%EB%B0%B0%EB%8B%AC%EC%9D%98%EB%AF%BC%EC%A1%B1/id378084485?mt=8"
                  target="_blank"
                >
                  <span>
                    <FaAppStoreIos />
                  </span>
                  AppStore
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sampleapp&hl=ko"
                  target="_blank"
                >
                  <span>
                    <FaGooglePlay />
                  </span>
                  PlayStore
                </a>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className={cn("AboutUsSection__section1", "AS")}>
            <div className="textbox">
              <h1>
                대한민국 <br /> 1등 배달앱
              </h1>
              <span className="under__line"></span>
              <p>오늘도 당신에게 행복을 배달 중입니다.</p>
            </div>
            <figure className={cn("AboutUsIco__imgbox01", "Ai")}>
              <img src={AboutIco01} alt="" />
            </figure>
          </div>
        </Section>
        <Section>
          <div className={cn("AboutUsSection1__textbox", "AS")}>
            <div className="textbox">
              <h1>
                배달을
                <br /> 더 빠르게
                <br /> 더 알뜰하게
              </h1>
              <span className="under__line"></span>

              <p>
                배민이 직접 배달을 챙기니까 더 좋아졌어요!
                <br /> 저렴해서 좋은 알뜰배달, 빨라서 좋은 한집배달
                <br /> 상황에 맞게 원하는 대로 골라 주문해보세요
              </p>
            </div>
            <figure className={cn("AboutUsIco__imgbox02", "Ai")}>
              <img src={AboutIco02} alt="" />
            </figure>
          </div>
        </Section>
        <Section>
          <div className={cn("AboutUsSection3__textbox", "AS")}>
            <div className="textbox">
              <h1>
                <br /> 초신속 <br />
                배민B마트
              </h1>
              <span className="under__line"></span>

              <p>
                트렌디한 간식도, 줄서서 먹는 맛집 밀키트도
                <br /> 무엇이든 한시간 안에 가져다 드려요.
                <br /> 365일 연중무휴 B마트에서 만나보세요.
              </p>
            </div>
            <figure className={cn("AboutUsIco__imgbox03", "Ai")}>
              <img src={AboutIco03} alt="" />
            </figure>
          </div>
        </Section>
        <Section>
          <div className={cn("AboutUsSection4__textbox", "AS")}>
            <div className="textbox">
              <h1>
                장보기도
                <br /> 쇼핑도
                <br /> 배민에서
              </h1>
              <span className="under__line"></span>

              <p>
                지금 필요한 건 지금 받아야죠!
                <br /> 토마토부터 핸드폰까지, 편의점부터 대형마트까지
                <br /> 이젠 택배말고 배달하세요.
              </p>
            </div>
            <figure className={cn("AboutUsIco__imgbox04", "Ai")}>
              <img src={AboutIco04} alt="" />
            </figure>
          </div>
        </Section>
        <Section>
          <div className={cn("AboutUsSection5__textbox", "AS")}>
            <div className="textbox">
              <h1>
                많이 살수록
                <br /> 더 저렴하죠
                <br /> 대용량 특가
              </h1>
              <span className="under__line"></span>

              <p>
                매일 필요한 생수, 세제, 화장지,샴푸는
                <br /> 미리 쟁여두면 든든하죠.
                <br /> 창고형 매장에서 무겁게 들고 오지 말고
                <br /> 대용량도 배민에서 주문하세요. 매일이 특가입니다.
              </p>
            </div>
            <figure className={cn("AboutUsIco__imgbox05", "Ai")}>
              <img src={AboutIco05} alt="" />
            </figure>
          </div>
        </Section>
      </AboutUsSectionBlock>
    </div>
  );
};

export default AboutUsSection;
