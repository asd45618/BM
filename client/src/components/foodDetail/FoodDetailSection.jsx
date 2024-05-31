import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Figure from "react-bootstrap/Figure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
    .figure {
      flex: 0 0 30%;
      margin-right: 15px;
      margin-bottom: 0;
      cursor: pointer;
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
  const user = useSelector((state) => state.members.user);
  const like = useSelector((state) => state.foods.likeFood);

  console.log(item);
  const { fdName, fdKrCategory, fdImg, fdDescription } = item;

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
        <Figure>
          <Figure.Image width={171} height={180} alt="171x180" src={fdImg} />
        </Figure>
        <div className="text__wrapper">
          <div className="info">
            <div className="text">
              <h2>{item.fdName}</h2>
              <span>{item.fdKrCategory}</span>
            </div>
            <p>{item.fdDescription}</p>
          </div>
        </div>
        <div className="like__btn">
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => clickLikeBtn(item.fdNo)}
            className={like?.find((val) => val.fdNo === item.fdNo) ? "on" : ""}
          />
        </div>
      </div>
    </FoodDetailSectionBlock>
  );
};

export default FoodDetailSection;
