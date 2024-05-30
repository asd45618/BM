import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    food: null, // { fdNo, fdName, fdDescription, fdImg, fdCategory }
  },
  reducers: {
    initFoods(state, action) {
      state.food = action.payload;
    },
  },
});

export const { initFoods } = foodSlice.actions;

export const fetchFood = (fdCategory) => (dispatch) => {
  axios
    .get("http://localhost:8001/food/list", { fdCategory })
    .then((res) => {
      dispatch(initFoods(res.data));
    })
    .catch((err) => console.log(err));
};

export default foodSlice.reducer;
