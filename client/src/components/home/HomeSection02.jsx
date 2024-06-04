import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFood } from "../../store/food";
import { useNavigate } from "react-router-dom";

const HomeSection02Block = styled.div`
  margin: 150px auto;
  overflow: hidden;
  .HomeSection2__title {
    text-align: center;
    margin-bottom: 10px;
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
      font-size: 1.1em;
      font-weight: 500;
      color: #292929;
    }
    span {
      border-bottom: 2px solid var(--main);
      width: 40px;
      display: inline-block;
    }
  }
  .slide {
    height: 35vw;
    background-size: cover;
    background-position: center;
    margin: 0 2px auto; /* 슬라이드 간 여백 설정 */
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      transform: translateY(20px);
    }
    h2 {
      font-size: 1.8em;
      text-align: center;
      font-family: var(--m-f-m);
    }
    .HomeSection2__imagebox {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
    padding: 40px !important;
  }
  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  /* .slick-slide:nth-child(even) .slide {
    transform: translateY(-20px);
  }
  .slick-slide:nth-child(odd) .slide {
    transform: translateY(20px);
  } */
`;

const HomeSection02 = () => {
  const foodList = useSelector((state) => state.foods.allFood);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    slidesToShow: 2,
    infinite: true,
    slidesToScroll: 1,
    cssEase: "linear",
    pauseOnHover: true,
    centerMode: true,
    arrows: false,
  };

  useEffect(() => {
    dispatch(fetchAllFood());
  }, []);

  return (
    <HomeSection02Block>
      <div className="HomeSection2__title">
        <h1>
          <strong>배달의민족</strong>의 메뉴추천
        </h1>
        <p>배달족들을 위한 배민의 메뉴추천</p>
        <span className="under__line"></span>
      </div>
      <Slider {...options}>
        {foodList?.map((item) => (
          <div
            key={item.id}
            className="slide"
            onClick={() =>
              navigate(`/foodDetail/${item.fdCategory}/${item.fdNo}`, {
                state: { item },
              })
            }
          >
            <figure className="HomeSection2__imagebox">
              <img src={item.fdImg} alt="" />
            </figure>
            <h2>{item.fdName}</h2>
          </div>
        ))}
      </Slider>
    </HomeSection02Block>
  );
};

export default HomeSection02;
