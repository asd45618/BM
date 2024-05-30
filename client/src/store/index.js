import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./member";
import foodReducer from "./food";

const store = configureStore({
  reducer: {
    members: memberReducer,
    foods: foodReducer,
  },
});

export default store;
