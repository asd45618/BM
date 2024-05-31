import React from "react";
import FoodDetailSection from "../components/foodDetail/FoodDetailSection";
import { useLocation } from "react-router-dom";

const FoodDetailView = () => {
  const location = useLocation();
  const { item } = location.state;

  return (
    <div>
      <FoodDetailSection item={item} />
    </div>
  );
};

export default FoodDetailView;
