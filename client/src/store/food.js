import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    allFood: null,
    food: null, // { fdNo, fdName, fdDescription, fdImg, fdCategory }
    likeFood: null,
    recentList: null,
  },
  reducers: {
    initAllFoods(state, action) {
      state.allFood = action.payload;
    },
    initFoods(state, action) {
      state.food = action.payload;
    },
    initLikeFoods(state, action) {
      state.likeFood = action.payload;
    },
    initRecent(state, action) {
      state.recentList = action.payload;
    },
  },
});

export const { initAllFoods, initFoods, initLikeFoods, initRecent } =
  foodSlice.actions;

export const fetchAllFood = () => (dispatch) => {
  axios
    .get("http://localhost:8001/food/allList")
    .then((res) => dispatch(initAllFoods(res.data)))
    .catch((err) => console.log(err));
};

export const fetchFood = (fdCategory) => (dispatch) => {
  axios
    .get(`http://localhost:8001/food/list?fdCategory=${fdCategory}`)
    .then((res) => {
      dispatch(initFoods(res.data));
    })
    .catch((err) => console.log(err));
};

export const fetchLikeFood = (userId) => (dispatch) => {
  axios
    .get(`http://localhost:8001/food/like?userId=${userId}`)
    .then((res) => {
      dispatch(initLikeFoods(res.data));
    })
    .catch((err) => console.log(err));
};

export const fetchRecent = (userId) => (dispatch) => {
  axios
    .get(`http://localhost:8001/food/recentList?userId=${userId}`)
    .then((res) => {
      dispatch(initRecent(res.data));
    })
    .catch((err) => console.log(err));
};

export default foodSlice.reducer;
