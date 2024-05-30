import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchFood } from "../../store/food";

const FoodListSectionBlock = styled.div``;

const FoodListSection = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.foodId;

  const list = useSelector((state) => state.foods.food);

  useEffect(() => {
    dispatch(fetchFood(category));
  }, []);

  return (
    <FoodListSectionBlock>
      <div>{list?.fdName}</div>
    </FoodListSectionBlock>
  );
};

export default FoodListSection;
