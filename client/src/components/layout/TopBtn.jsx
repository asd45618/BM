import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const TopBtnBlock = styled.div`
  position: fixed;
  right: 20px;
  bottom: 40px;

  .top__btn {
    position: relative;
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 50%;
    cursor: pointer;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const TopBtn = () => {
  return (
    <TopBtnBlock>
      <div className="top__btn" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faChevronUp} />
      </div>
    </TopBtnBlock>
  );
};

export default TopBtn;
