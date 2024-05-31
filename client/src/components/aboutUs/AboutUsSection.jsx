import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Section1Img from "@/assets/image/AboutUs_bg.jpg";
import RiderImg from "@/assets/image/AboutUs_rider_button.png";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa6";

const AboutUsSectionBlock = styled.div`
  margin-top: 106px;
  overflow: hidden;
  position: relative; /* scroll-indicator가 위치할 수 있도록 설정 */
  &:before {
    content: ""; /* 가상 요소를 사용하여 추가적인 공간 확보 */
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 30px; /* scroll-indicator의 너비만큼 여백을 확보 */
    height: 100vh;
  }
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
  opacity: 0; /* 초기 투명도 설정 */
  transition: opacity 0.8s ease-in-out; /* 트랜지션 효과 추가 */
  &:nth-child(1) {
    position: relative;
  }
  h1 {
    color: white;
  }
  .AboutUsSection__riderimgbox {
    position: absolute; /* 이미지를 섹션에 절대 위치시키기 위한 설정 */
    top: 0;
    right: 0;
    width: 150px; /* 이미지 너비 조정 */
    height: auto; /* 이미지 높이 자동 조정 */
    z-index: 99; /* 다른 내용 위에 표시되도록 설정 */
  }
  .AboutUsSection__section1 {
    .AboutUsSection__imgbox {
      position: absolute; /* 이미지를 섹션에 상대적으로 위치시키기 위해 절대 위치 설정 */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        object-fit: cover; /* 이미지가 섹션을 꽉 채울 수 있도록 설정 */
        width: 100%;
        height: 100%;
        filter: brightness(0.9);
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

    .AboutUsSection1__textbox {
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
      }
      .AboutUsSection__btn {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
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
`;

const AboutUsSection = () => {
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0); // 활성 섹션 상태

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 섹션이 절반 이상 노출될 때 감지
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setActiveSection(index); // 현재 보여지는 섹션의 인덱스를 업데이트
          entry.target.style.opacity = "1"; // 노출되면 투명도를 1로 설정하여 보이게 함
        } else {
          entry.target.style.opacity = "0"; // 노출되지 않으면 투명도를 0으로 설정하여 보이지 않게 함
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    sectionRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AboutUsSectionBlock>
      <Section ref={(el) => (sectionRefs.current[0] = el)}>
        <figure className="AboutUsSection__riderimgbox">
          <a href="https://join.baeminconnect.com/" target="_blank">
            <img src={RiderImg} alt="" />
          </a>
          <div className="dem"></div>
        </figure>
        <div className="AboutUsSection__section1">
          <figure className="AboutUsSection__imgbox">
            <img src={Section1Img} alt="" />
            <div className="dem"></div>
          </figure>

          <div className="AboutUsSection1__textbox">
            <h1>마음에도 당충전이 필요할때</h1>
            <div className="AboutUsSection__btn">
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
      <Section ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="AboutUsSection__section2">
          <h1>Section 2</h1>
        </div>
      </Section>
      <Section ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="AboutUsSection__section3">
          <h1>Section 3</h1>
        </div>
      </Section>
      <div className="scroll-indicator">
        {sectionRefs.current.map((_, index) => (
          <Dot key={index} active={activeSection === index} />
        ))}
      </div>
    </AboutUsSectionBlock>
  );
};

export default AboutUsSection;
