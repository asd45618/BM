import React from "react";
import styled from "styled-components";

const HomeSection01Block = styled.section`
  h1 {
    padding: 150px;
  }
`;
const HomeSection01 = () => {
  return (
    <HomeSection01Block>
      <h1>안녕하세요 홈세션1입니다</h1>
    </HomeSection01Block>
  );
};

export default HomeSection01;
