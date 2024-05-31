import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    allFood: null,
    food: null, // { fdNo, fdName, fdDescription, fdImg, fdCategory }
  },
  reducers: {
    initAllFoods(state, action) {
      state.allFood = action.payload;
    },
    initFoods(state, action) {
      state.food = action.payload;
    },
  },
});

export const { initAllFoods, initFoods } = foodSlice.actions;

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
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

export default foodSlice.reducer;
