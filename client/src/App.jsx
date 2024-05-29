import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/Layout";
import JoinView from "./views/JoinView";
import LoginView from "./views/LoginView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/join" element={<JoinView />} />
        <Route path="/login" element={<LoginView />} />
      </Route>
    </Routes>
  );
}

export default App;
