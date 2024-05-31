import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const FoodDetailSectionBlock = styled.div`
  margin: 150px 0 50px;
`;

const FoodDetailSection = ({ item }) => {
  const user = useSelector((state) => state.members.user);
  const {} = item;

  useEffect(() => {
    axios
      .post("http://localhost:8001/food/recent", {
        fdNo: item.fdNo,
        userId: user?.userId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <FoodDetailSectionBlock></FoodDetailSectionBlock>;
};

export default FoodDetailSection;
