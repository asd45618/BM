import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { fetchLikeFood } from "../../store/food";
import { useNavigate } from "react-router-dom";

const FoodDetailSectionBlock = styled.div`
  margin: 106px 0 50px;
  font-family: var(--m-f-m);
  margin-bottom: 5rem;
  text-align: center;
  .detail__wrapper {
    padding-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
    .info {
      .text {
        margin: 10px 0 30px;
        p {
          margin-bottom: 0.7rem;
        }
        h2 {
          font-size: 36px;
          margin-bottom: 0;
        }
        .bar__wrapper {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          .bar {
            width: 30px;
            border: 1px solid #ddd;
          }
        }
        .text__des {
          color: #aaa;
          font-size: 16px;
        }
      }
    }
    .like__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      color: #ddd;
      svg {
        cursor: pointer;
        &.on {
          color: #fa5252;
        }
      }
    }
  }
`;

const FoodDetailSection = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.members.user);
  const like = useSelector((state) => state.foods.likeFood);

  const { fdNo, fdName, fdKrCategory, fdImg, fdDescription } = item;

  const clickLikeBtn = (item) => {
    if (user) {
      axios
        .post("http://localhost:8001/food/likeClick", {
          fdNo: item,
          userId: user.userId,
        })
        .then((res) => {
          if (res.data.affectedRows === 1) {
            dispatch(fetchLikeFood(user.userId));
          } else {
            alert("좋아요 실패");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("로그인해 주세요.");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:8001/food/recent", {
          fdNo: item.fdNo,
          userId: user?.userId,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <FoodDetailSectionBlock>
      <div className="detail__wrapper">
        <Image src={fdImg} fluid />
        <div className="text__wrapper">
          <div className="info">
            <div className="text">
              <p>{fdKrCategory}</p>
              <h2>{fdName}</h2>
              <div className="bar__wrapper">
                <div className="bar"></div>
              </div>
              <p className="text__des">{fdDescription}</p>
            </div>
          </div>
        </div>
        <div className="like__btn">
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => clickLikeBtn(fdNo)}
            className={like?.find((val) => val.fdNo === fdNo) ? "on" : ""}
          />
        </div>
      </div>
    </FoodDetailSectionBlock>
  );
};

export default FoodDetailSection;
