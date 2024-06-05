import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RouletteModalBlock = styled.div`
  z-index: 99;
  animation: fadeInDown 0.5s;

  &.close {
    animation: fadeInUp 0.5s;
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 5px 9.5px 19px rgba(0, 0, 0, 0.3),
    5px 7.5px 6px rgba(0, 0, 0, 0.22);
  width: 90%;
  max-width: 500px;
  padding: 20px;
  text-align: center;
`;

const ModalHeader = styled.div`
  border-bottom: none;
  margin-bottom: 20px;
  .modal-title {
    color: var(--main);
    font-family: var(--m-f-m);
    font-size: 2rem;
  }
  p {
    font-size: 13px;
    font-weight: bold;
    color: #9c9c9c;
    font-family: var(--m-f-n);
  }
`;

const ModalBody = styled.div`
  .food__img {
    margin-bottom: 20px;
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .food__name {
    p {
      margin: 10px 0 0;
      font-size: 34px;
      font-family: var(--m-f-m);
      color: #4b4b4b;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  border-top: none;
  .btn {
    margin: 30px 10px;
    padding: 10px 20px;
    border: none;
    font-family: var(--m-f-m);
    cursor: pointer;
    transition: all 0.5s ease;
    &:first-child {
      border: 1px solid var(--main);
      color: var(--main);
      &:hover {
        background: var(--main);
        color: white;
      }
    }
    &:last-child {
      border: 1px solid #8b8b8b;
      color: #8b8b8b;
      &:hover {
        background: #8b8b8b;
        color: white;
      }
    }
  }
`;

const RouletteModal = ({ result, reSpin }) => {
  const navigate = useNavigate();
  const goToFood = () => {
    navigate(`/foodDetail/${result.fdCategory}/${result.fdNo}`, {
      state: { item: result },
    });
  };

  const [close, setClose] = useState(false);

  const closeRullet = () => {
    setClose(true);
    setTimeout(() => {
      reSpin(false);
    }, 300); // 0.5 seconds delay
  };

  return (
    <RouletteModalBlock className={close ? "close" : ""}>
      <ModalContent>
        <ModalHeader>
          <div className="modal-title">배민 룰렛</div>
          <p>랜덤 메뉴 추천</p>
        </ModalHeader>
        <ModalBody>
          <div className="food__img">
            <img src={result?.fdImg} alt={result?.fdNo} />
          </div>
          <div className="food__name">
            <p>{result?.fdName}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn" onClick={goToFood}>
            상세페이지로 이동
          </button>
          <button className="btn" onClick={closeRullet}>
            다시 돌리기
          </button>
        </ModalFooter>
      </ModalContent>
    </RouletteModalBlock>
  );
};

export default RouletteModal;
