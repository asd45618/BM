import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFood } from "../../store/food";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeSection02Block = styled.div`
  margin: 350px auto;
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
    margin: 0 2px auto;
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
      height: 200px;
      overflow: hidden;
      padding: 10px;

      img {
        width: 250px;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
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
  .gobutton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    border: 1px solid var(--main);
    width: 40%;
    padding: 15px 30px;
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <HomeSection02Block>
      <div
        className="HomeSection2__title"
        data-aos="fade-up"
        data-aos-anchor-placement="top"
      >
        <h1>
          <strong>배달의민족</strong>의 메뉴추천
        </h1>
        <p>배달족들을 위한 배민의 메뉴추천1</p>
        <span className="under__line"></span>
      </div>
      <Slider {...options}>
        {foodList?.map((item) => (
          <div
            key={item.fdNo}
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
      <Link
        to="/foodRecommend"
        className="gobutton"
        data-aos="fade-down"
        data-aos-anchor-placement="top"
      >
        <p>랜덤메뉴추천</p>{" "}
        <span>
          <FaArrowRightLong />
        </span>
      </Link>
    </HomeSection02Block>
  );
};

export default HomeSection02;
