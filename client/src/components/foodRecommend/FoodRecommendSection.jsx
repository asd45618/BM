import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchFood } from "../../store/food";
import AOS from "aos";
import "aos/dist/aos.css";

const FoodRecommendSectionBlock = styled.div`
  margin: 150px 0 50px;
  h1 {
    color: var(--main);
    font-size: 3em;
    font-family: var(--m-f-m);
    text-align: center;
  }
  .category__text {
    text-align: center;
    font-weight: bold;
    color: #9c9c9c;
    font-family: var(--m-f-n);
  }
  span {
    border-bottom: 2px solid var(--main);
    width: 40px;
    display: flex;
    text-align: center;
    margin: 0px auto 20px;
  }
  .desc {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 50px;
    font-family: var(--m-f-n);
    color: #303030;
  }
  .food__Depth1 {
    align-items: center;
    display: grid;
    gap: 25px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0 30px;
    li {
      cursor: pointer;
    }
    h2 {
      text-align: center;
      margin-top: 15px;
      font-size: 2em;
      font-family: var(--m-f-m);
      font-weight: 500;
    }
    .imagebox {
      margin: 0 auto;
      height: auto;
      overflow: hidden;
      background: #f2f2f2;
      padding: 20px;
      border-radius: 50%;
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
      img {
        width: 100%;
        height: auto;
        transition: all 0.5s ease;
      }
    }
  }
`;

const FoodRecommendSection = () => {
  const dispatch = useDispatch();

  const foodList = [
    {
      foodId: "kr",
      image: "./assets/image/ic_krfood.png",
      alt: "한식 아이콘",
      name: "한식",
    },
    {
      foodId: "ch",
      image: "./assets/image/ic_chfood.png",
      alt: "중식 아이콘",
      name: "중식",
    },
    {
      foodId: "ws",
      image: "./assets/image/ic_wsfood.png",
      alt: "양식 아이콘",
      name: "양식",
    },
    {
      foodId: "js",
      image: "./assets/image/ic_jpfood.png",
      alt: "일식 아이콘",
      name: "일식",
    },
    {
      foodId: "sn",
      image: "./assets/image/ic_snfood.png",
      alt: "분식 아이콘",
      name: "분식",
    },
    {
      foodId: "chicken",
      image: "./assets/image/ic_chicken.png",
      alt: "치킨 아이콘",
      name: "치킨",
    },
    {
      foodId: "pizza",
      image: "./assets/image/ic_pizza.png",
      alt: "피자 아이콘",
      name: "피자",
    },
    {
      foodId: "cafe",
      image: "./assets/image/ic_cafefood.png",
      alt: "카페 아이콘",
      name: "카페",
    },
  ];

  const goToRoulette = (foodId) => {
    dispatch(fetchFood(foodId));
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <FoodRecommendSectionBlock>
      <div data-aos="fade-down">
        <h1>배민 룰렛</h1>
        <p className="category__text">카테고리 선택</p>
        <span></span>
        <p className="desc">
          카테고리를 선택하면 해당하는 카테고리의 음식 랜덤 룰렛이 돌아갑니다.
        </p>
      </div>
      <ul className="food__Depth1">
        {foodList.map((item, index) => (
          <li key={index} data-aos="fade-up">
            <Link
              to={`/roulette/${item.foodId}`}
              onClick={() => goToRoulette(item.foodId)}
            >
              <figure className="imagebox">
                <img src={item.image} alt={item.alt} />
              </figure>
              <h2>{item.name}</h2>
              <p></p>
            </Link>
          </li>
        ))}
      </ul>
    </FoodRecommendSectionBlock>
  );
};

export default FoodRecommendSection;
