import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import axios from "axios";
import { fetchLikeFood } from "../../store/food";
import { useNavigate } from "react-router-dom";

const FoodLikeListSectionBlock = styled.div`
  margin: 150px 0 50px;
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

const FoodLikeListSection = () => {
  const dispatch = useDispatch();
  const navgiate = useNavigate();

  const like = useSelector((state) => state.foods.likeFood);
  const user = useSelector((state) => state.members.user);
  const [userLikeList, setUserLikeList] = useState([]);

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
      .get(`http://localhost:8001/food/allLike?userId=${user.userId}`)
      .then((res) => {
        console.log(res);
        setUserLikeList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FoodLikeListSectionBlock>
      <div className="h1__tag">
        <h1>좋아요</h1>
      </div>
      <ul>
        {userLikeList?.map((item) => (
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
                  className={
                    like?.find((val) => val.fdNo === item.fdNo) ? "on" : ""
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </FoodLikeListSectionBlock>
  );
};

export default FoodLikeListSection;