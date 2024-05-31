import React from "react";
import FoodListSection from "../components/foodList/FoodListSection";
import { useLocation } from "react-router-dom";

const FoodListView = () => {
  const location = useLocation();
  const { category } = location.state;
  return (
    <div>
      <FoodListSection category={category} />
    </div>
  );
};

export default FoodListView;
