import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/Layout";
import JoinView from "./views/JoinView";
import LoginView from "./views/LoginView";
import MemberModifyView from "./views/MemberModifyView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/join" element={<JoinView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/memberModify" element={<MemberModifyView />} />
      </Route>
    </Routes>
  );
}

export default App;
