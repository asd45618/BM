import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchFood } from "../../store/food";

const FoodListSectionBlock = styled.div`
  margin: 150px 0 50px;
`;

const FoodListSection = () => {
  const params = useParams();

  const list = useSelector((state) => state.foods.food);

  return (
    <FoodListSectionBlock>
      <div>
        {list?.map((item) => (
          <div>{item.fdName}</div>
        ))}
      </div>
    </FoodListSectionBlock>
  );
};

export default FoodListSection;
