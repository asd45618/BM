import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import axios from "axios";

const FoodListSectionBlock = styled.div`
  margin: 130px 0 50px;
  padding: 0 30px;
  font-family: var(--m-f-m);
  .h1__tag {
    text-align: center;
    margin-bottom: 60px;
  }
  ul {
    padding: 0;
    li {
      border-bottom: 1px solid #ddd;
      margin-bottom: 2rem;
      .info__wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 10px;
        .figure {
          flex: 0 0 30%;
          margin-right: 15px;
          margin-bottom: 0;
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
    }
  }
`;

const FoodListSection = () => {
  const params = useParams();

  const list = useSelector((state) => state.foods.food);
  const user = useSelector((state) => state.members.user);

  const clickLikeBtn = (item) => {
    axios
      .post("http://localhost:8001/food/likeClick", {
        fdNo: item.fdNo,
        userId: user.userId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, []);

  return (
    <FoodListSectionBlock>
      <div className="h1__tag">
        <h1>한식</h1>
      </div>
      <ul>
        {list?.map((item) => (
          <li key={item.fdNo}>
            <div className="info__wrapper">
              <Figure>
                <Figure.Image
                  width={130}
                  height={130}
                  alt="171x180"
                  src={item.fdImg}
                />
              </Figure>
              <div className="info">
                <div className="text">
                  <h2>{item.fdName}</h2>
                  <span>{item.fdKrCategory}</span>
                </div>
                <p>{item.fdDescription}</p>
              </div>
              <div className="like__btn">
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => clickLikeBtn(item.fdNo)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </FoodListSectionBlock>
  );
};

export default FoodListSection;
