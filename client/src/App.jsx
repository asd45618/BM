import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/Layout";
import HomeView from "./views/HomeView";
import JoinView from "./views/JoinView";
import LoginView from "./views/LoginView";
import MemberModifyView from "./views/MemberModifyView";
import FoodListView from "./views/FoodListView";
import AboutUsView from "./views/AboutUsView";
import FoodLikeListView from "./views/FoodLikeListView";
import RecentFoodView from "./views/RecentFoodView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path="/join" element={<JoinView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/memberModify" element={<MemberModifyView />} />
        <Route path="/foodlist/:foodId" element={<FoodListView />} />
        <Route path="/aboutus" element={<AboutUsView />} />
        <Route path="/likeList" element={<FoodLikeListView />} />
        <Route path="/recentFood" element={<RecentFoodView />} />
      </Route>
    </Routes>
  );
}

export default App;
