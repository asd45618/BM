import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { fetchLikeFood } from "../../store/food";
import { useNavigate } from "react-router-dom";

const FoodDetailSectionBlock = styled.div`
  margin: 150px 0 50px;
  padding: 0 30px;
  font-family: var(--m-f-m);
  margin-bottom: 2rem;
  .detail__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 10px;
    .card {
      margin-right: 15px;
      margin-bottom: 0;
      border-radius: 25px;
      img {
        border-radius: 25px;
      }
    }
    .info {
      flex: 0 0 50%;
      .text {
        display: flex;
        align-items: center;
        margin-bottom: 3px;
        h2 {
          margin-right: 10px;
          margin-bottom: 0;
        }
        span {
        }
      }
      p {
        color: #aaa;
        font-size: 14px;
      }
    }
    .like__btn {
      flex: 0 0 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      color: #ddd;
      svg {
        cursor: pointer;
        &.on {
          color: pink;
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
      navgiate("/login");
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:8001/food/recent", {
        fdNo: item.fdNo,
        userId: user?.userId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <FoodDetailSectionBlock>
      <div className="detail__wrapper">
        <div className="text__wrapper">
          <div className="info">
            <div className="text">
              <h2>{fdName}</h2>
              <span>{fdKrCategory}</span>
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
        <Card>
          <Card.Img variant="top" src={fdImg} />
          <Card.Body>
            <Card.Text>{fdDescription}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </FoodDetailSectionBlock>
  );
};

export default FoodDetailSection;
