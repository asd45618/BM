import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const RouletteModalBlock = styled.div`
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
  .modal {
    text-align: center;
    .modal-dialog {
      .modal-content {
        .modal-header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: none;
          .modal-title {
            color: var(--main);
            font-family: var(--m-f-m);
            font-size: 2rem;
          }
          p {
            font-size: 12px;
            font-weight: bold;
            color: #9c9c9c;
          }
        }
        .modal-body {
          .food__img {
            img {
            }
          }
          .food__name {
            p {
              margin: 10px 0 0;
              font-size: 24px;
              font-family: var(--m-f-m);
            }
          }
        }
        .modal-footer {
          display: flex;
          justify-content: center;
          border: none;
          font-family: var(--m-f-m);
          .btn-secondary {
            border: none;
            background: #fff;
            color: #000;
          }
          .btn-primary {
            border: none;
            background: #fff;
            color: #000;
          }
        }
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
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>배민 룰렛</Modal.Title>
            <p>랜덤 메뉴 추천</p>
          </Modal.Header>

          <Modal.Body>
            <div className="food__img">
              <img src={result?.fdImg} alt={result?.fdNo} />
            </div>
            <div className="food__name">
              <p>{result?.fdName}</p>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={goToFood}>
              상세페이지로 이동
            </Button>
            <Button variant="primary" onClick={closeRullet}>
              다시 돌리기
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </RouletteModalBlock>
  );
};

export default RouletteModal;
