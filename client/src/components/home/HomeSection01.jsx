import React from "react";
import styled from "styled-components";

const HomeSection01Block = styled.section`
  h1 {
    padding: 150px;
  }
`;
const HomeSection01 = () => {
  const foodList = [
    {
      foodId: "kr",
      image: "./assets/image/ic_krfood.png",
      name: "한식",
    },
    {
      foodId: "ch",
      image: "./assets/image/ic_chfood.png",
      name: "중식",
    },
    {
      foodId: "ws",
      image: "./assets/image/ic_wsfood.png",
      name: "양식",
    },
    {
      foodId: "js",
      image: "./assets/image/ic_jpfood.png",
      name: "일식",
    },
    {
      foodId: "sn",
      image: "./assets/image/ic_snfood.png",
      name: "분식",
    },
    {
      foodId: "cafe",
      image: "./assets/image/ic_cafefood.png",
      name: "카페",
    },
  ];

  return (
    <HomeSection01Block>
      <h1>음식리스트</h1>
      <ul className="foodDepth1">
        {foodList.map((item, index) => (
          <li key={index}>
            <figure className="imagebox">
              <img src={item.image} alt="" />
              <h2>{item.name}</h2>
            </figure>
          </li>
        ))}
      </ul>
    </HomeSection01Block>
  );
};

export default HomeSection01;
