import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";
import { FaArrowRightLong } from "react-icons/fa6";

const ServiceSectionBlock = styled.div`
  margin-top: 106px;
  .service__wrap {
    .service__type {
      display: flex;
      justify-content: center;
      button {
        padding: 20px;
        display: flex;
        width: 100%;
        text-align: center;
        justify-content: center;
        background: transparent;
        border-bottom: 3px solid #f3f3f3;
        transition: all 0.5s ease;
        font-family: var(--m-f-m);
        font-size: 1.5em;
        font-weight: 500;
        color: #222222;
        &.on {
          border-bottom: 3px solid var(--main);
          color: var(--main);
        }
      }
    }
    .service__tapLogo {
      text-align: center;
      font-family: var(--m-f-m);
      width: 300px;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 50px auto;
      transition: all 0.7s ease;
      opacity: 0;
      transform: translateX(500px);
      &.on {
        transform: translateX(0);
        opacity: 1;
      }
      img {
        width: 100%;
        height: auto;
        margin: 20px;
      }
      h3 {
        font-size: 3em;
        display: flex;
      }
      .under__line {
        border-bottom: 2px solid var(--main);
        width: 40px;
        display: inline-block;
        margin: 20px 0;
      }
      p {
        font-size: 1.5em;
        word-break: keep-all;
      }
    }
    .service__service__main {
      transition: all 0.7s ease;
      opacity: 0;
      transform: translateY(500px);
      &.on {
        transform: translateX(0);
        opacity: 1;
      }
      .service__subPhoto_imgbox {
        width: 100%;
        height: 500px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      p {
        font-size: 1.2em;
        font-family: var(--m-f-n);
        padding: 10px 20px;
        line-height: 2em;
        text-align: center;
        word-break: keep-all;
      }

      .service__submain1,
      .service__submain2 {
        align-items: center;
        word-break: keep-all;
        padding: 5px;

        img {
          margin: 30px 0;
          text-align: center;
        }
        span {
          display: flex;
          justify-content: center;
          img {
          }
        }
      }
    }
    .gobutton {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px auto;
      border: 1px solid var(--main);
      width: 40%;
      padding: 10px;
      color: var(--main);
      font-family: var(--m-f-m);
      transition: all 0.5s ease;
      span {
        transition: all 0.5s ease;
        transform: translateX(10px);
      }
      p {
        margin: 0;
        transition: all 0.5s ease;
        font-size: 1.3em;
        padding: 0;
      }
      &:hover {
        background: var(--main);
        span {
          transform: translateX(20px);
          color: white;
        }
        p {
          color: white;
          border-color: var(--main);
        }
      }
    }
  }
`;

const ServiceSection = () => {
  const [active, setActive] = useState(0);
  const [activeAni, setActiveAni] = useState(false);
  const serviceMenu = [
    {
      menu: "./assets/image/service_logo_01.png",
      id: 0,
      name: "배민배달",
      serviceSub: "배민이 직접 챙기니까배달을 더 빠르게, 더 알뜰하게",
    },
    {
      menu: "./assets/image/service_logo_02.png",
      id: 1,
      name: "배민포장",
      serviceSub: "포장주문도 배민이 합니다",
    },
    {
      menu: "./assets/image/service_logo_03.png",
      id: 2,
      name: "배민로봇",
      serviceSub: "로봇을 한 걸음 더 가까이",
    },
  ];

  const serviceData = {
    0: [
      {
        serviceImg: "./assets/image/service_photo_01.jpg",
        serviceSubImg1: "./assets/image/service_Rider_01.png",
        serviceSubImg2: "./assets/image/service_Rider_02.png",

        servicecopy:
          "한집배달은 한 번에 한 집만 빠르게 배달하는 서비스입니다. 내가 있는 곳으로 바로 와서 배달 시간이 빨라요. 주문한 음식이 잘 오고 있는지 실시간으로 라이더 위치와 예상 도착 시간도 확인할 수 있어요. 신속한 배달이 필요할 땐 한집배달로 주문해 보세요.",
        servicecopy2:
          "알뜰배달은 배달 동선에 따라 최적의 묶음배달을 수행함으로써 배달팁을 낮춘 서비스입니다. 배달의민족만의 특별한 AI 배차 기술로 가까운 주문은 함께, 최적의 길로 배달해요. 그동안 축적된 수많은 주문 데이터와 배달 효율화 기술 덕분입니다. 실속을 챙기고 싶을 땐 알뜰배달로 주문하세요.",
      },
    ],
    1: [
      {
        serviceImg: "./assets/image/service_photo_02.jpg",
        servicecopy:
          "배민포장주문은 음식 포장을 앱으로 주문 결제하는 서비스입니다. 배민포장주문에서 자주 가는 동네 맛집을 찾아 미리 결제 후, 안내된 시간에 바로 픽업하세요. 주문을 위해 매장에서 줄을 서거나 음식이 나올 때까지 기다릴 필요가 없어요. 지도를 열어 내 위치를 중심으로 자주 가는 동네 맛집을 찾거나 카테고리 별로 먹고 싶은 음식을 살펴보세요. 이제 포장주문도 배달 주문처럼 배민에서 하세요!",
      },
    ],
    2: [
      {
        serviceImg: "./assets/image/service_photo_03.jpg",
        servicecopy:
          "배민로봇의 이름 딜리(dilly)는 ‘맛있는(Delicious)’ 음식을 ‘전달(Delivery)’ 한다는 의미입니다. 배달로봇 딜리는 배달 인프라를 혁신하고 있어요. 자율 주행으로 배달원이 가지 못하는 곳, 가기 꺼리는 곳도 자유롭게 이동하며, 음식부터 생활용품까지 배달해요. 서빙로봇 딜리는 보다 효율적인 매장 운영을 가능하게 해요. 무거운 음식을 나르고, 반복되는 사람의 일을 대신합니다. 직원의 업무 피로도는 낮아지고, 서비스는 좋아져 손님의 만족도가 높아져요. 배민 로봇은 더 나은 외식 서비스의 미래를 위해 열심히 달리겠습니다.",
        serviceLink: "https://robot.baemin.com/",
      },
    ],
  };

  useEffect(() => {
    setActiveAni(true);
  }, []);

  return (
    <ServiceSectionBlock>
      <div className="service__wrap">
        <div className="service__type">
          {serviceMenu.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActive(item.id);
              }}
              className={active === item.id && "on"}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className={cn("service__tapLogo", activeAni && "on")}>
          <img src={serviceMenu[active].menu} alt="" />
          <span className="under__line"></span>
          <p>{serviceMenu[active].serviceSub}</p>
        </div>
        {serviceData[active].map((item, index) => (
          <div
            className={cn("service__service__main", activeAni && "on")}
            key={index}
          >
            <figure className="service__subPhoto_imgbox">
              <img src={item.serviceImg} alt="" />
            </figure>
            <div className="service__take__submain">
              {item.serviceSubImg1 && (
                <div className="service__submain1">
                  <span className="service__subImgbox1">
                    <img src={item.serviceSubImg1} alt="" />
                  </span>
                </div>
              )}
              <p>{item.servicecopy}</p>
              {item.serviceSubImg2 && (
                <div className="service__submain2">
                  <span className="service__subImgbox2">
                    <img src={item.serviceSubImg2} alt="" />
                  </span>
                  <p>{item.servicecopy2}</p>
                </div>
              )}
            </div>
            {item.serviceLink && (
              <a href={item.serviceLink} target="_blank" className="gobutton">
                <p>바로가기</p>{" "}
                <span>
                  <FaArrowRightLong />
                </span>
              </a>
            )}
          </div>
        ))}
      </div>
    </ServiceSectionBlock>
  );
};

export default ServiceSection;
