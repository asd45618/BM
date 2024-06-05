import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const TopBtnBlock = styled.div`
  position: fixed;
  right: 20px;
  bottom: 40px;
  animation: fadeInUp 0.5s;
  z-index: 99999;
  &.disappear {
    opacity: 0;
    animation: fadeInDown 0.5s;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }
  .top__btn {
    position: relative;
    width: 50px;
    height: 50px;
    background: var(--main);
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  }
`;

const TopBtn = ({ scrollPosition }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TopBtnBlock className={scrollPosition ? "" : "disappear"}>
      <div className="top__btn" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faChevronUp} />
      </div>
    </TopBtnBlock>
  );
};

export default TopBtn;
