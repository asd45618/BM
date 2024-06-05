import React, { useEffect } from "react";
import video from "@/assets/image/HomeSection03__video.mp4";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeSection03Block = styled.div`
  margin-top: 350px;
  video {
    width: 100%;
    height: auto;
  }
  .HomeSection3__title {
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
  .HomeSection3__subtitle {
    text-align: center;
    margin: 30px 0;
    h1 {
      font-family: var(--m-f-m);
      font-size: 2em;
      font-weight: 600;
      strong {
        font-size: 1.3em;
        color: var(--main);
        font-weight: normal;
      }
    }
    p {
      font-family: var(--m-f-n);
      font-size: 0.9em;
      letter-spacing: -1px;
      font-weight: 500;
      color: #292929;
    }
  }
`;

const Homesection03 = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  return (
    <HomeSection03Block>
      <div
        className="HomeSection3__title"
        data-aos="fade-up"
        data-aos-anchor-placement="top"
      >
        <h1>
          '문앞으로 배달되는 <br />
          <strong>일상의 행복</strong>' 이라는 비전으로
        </h1>
        <p>
          배달의 민족은 배달이 일상을 조금 더 행복하게 하도록 오늘도 달리고
          있어요
        </p>
        <span className="under__line"></span>
      </div>
      <video
        autoPlay
        loop
        controls
        data-aos="fade-down"
        data-aos-anchor-placement="top"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="HomeSection3__subtitle"
        data-aos="fade-down"
        data-aos-anchor-placement="top"
      >
        <h1>
          오늘이 <strong>전설</strong>이 될 수 있도록
        </h1>
        <p>
          세계 진출, 배민로봇 개발, 인공지능을 연구하며 <br />
          배달의민족은 미래를 더 가깝게 만들고 있어요.
        </p>
      </div>
    </HomeSection03Block>
  );
};

export default Homesection03;
