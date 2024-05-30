import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useSelector } from "react-redux";

const HomeSection02Block = styled.div`
  .slide {
    height: 40vw;
    background-size: cover;
    background-position: center;
  }
`;

const HomeSection02 = () => {
  const foodList = useSelector((state) => state.foods.allFood);

  const options = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    // prevArrow: <IoIosArrowDropleftCircle />,
    // nextArrow: <IoIosArrowDroprightCircle />,
  };
  return (
    <HomeSection02Block>
      <div className="HomeSection2__title">
        <h1>배달의민족의 메뉴추천</h1>
        <p>평범한 사람들이 모여 비범한 성과를</p>
      </div>
      <Slider {...options}>
        <div className="slide slide1"></div>
        <div className="slide slide2"></div>
        <div className="slide slide3"></div>
      </Slider>
    </HomeSection02Block>
  );
};

export default HomeSection02;
