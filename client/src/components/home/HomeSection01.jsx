import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFood } from "../../store/food";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeSection01Block = styled.section`
  padding-top: 150px;
  h1 {
    color: var(--main);
    font-size: 3em;
    font-family: var(--m-f-m);
    text-align: center;
  }
  span {
    border-bottom: 2px solid var(--main);
    width: 40px;
    display: flex;
    text-align: center;
    margin: 30px auto;
  }
  .food__Depth1 {
    align-items: center;
    display: grid;
    gap: 50px;
    grid-template-columns: 1fr 1fr 1fr;
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
const HomeSection01 = () => {
  const foodList = [
    {
      foodId: "all",
      image: "./assets/image/ic_all.png",
      alt: "전체 아이콘",
      name: "전체",
    },
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

  const dispatch = useDispatch();

  const getFoodList = (category) => {
    dispatch(fetchFood(category));
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <HomeSection01Block>
      <div className="homeSection01__maintext" data-aos="fade-up">
        <h1>음식리스트</h1>
        <span></span>
      </div>
      <ul className="food__Depth1" data-aos="fade-down">
        {foodList.map((item, index) => (
          <li key={index}>
            <Link
              to={`/foodList/${item.foodId}`}
              state={{ category: item.name }}
              onClick={() => getFoodList(item.foodId)}
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
    </HomeSection01Block>
  );
};

export default HomeSection01;
