import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikeFood, fetchRecent } from "../../store/food";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListImg from "@/assets/image/list_ico.gif";

const RecentFoodSectionBlock = styled.div`
  margin: 150px 0 50px;
  padding: 0 30px;
  font-family: var(--m-f-m);
  .h1__tag {
    text-align: center;
    color: var(--main);
  }
  .under__line {
    border-bottom: 2px solid var(--main);
    width: 40px;
    display: inline-block;
    margin: 30px 0;
  }
  ul {
    padding: 0;
    li {
      border-bottom: 1px solid #ddd;
      margin-bottom: 2rem;
      .info__wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        .figure {
          flex: 0 0 30%;
          width: 130px;
          height: 130px;
          margin-right: 15px;
          margin-bottom: 25px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 25px;
          }
        }
        .info {
          flex: 0 0 40%;
          .text {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 3px;
            h2 {
              margin-right: 10px;
              flex: 0 0 70%;
              margin-bottom: 0;
            }
            span {
            }
          }
          p {
            color: #828282;
            font-size: 14px;
            font-family: var(--m-f-n);
            word-break: keep-all;
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
            transition: all 0.5s ease;
            &.on {
              color: #fa5252;
              &:hover {
                color: #ddd;
              }
            }
            &:hover {
              color: #fa5252;
            }
          }
        }
      }
    }
  }
  .recent__nolist {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .recent__nolist__listIco {
      border: 1px solid #ccc;
      padding: 25px;
      border-radius: 50%;
      margin-bottom: 50px;
      margin-top: 10px;
    }
  }
`;

const RecentFoodSection = () => {
  const dispatch = useDispatch();
  const navgiate = useNavigate();

  const user = useSelector((state) => state.members.user);
  const like = useSelector((state) => state.foods.likeFood);
  const recentList = useSelector((state) => state.foods.recentList);

  const goToDetail = (item) => {
    navgiate(`/foodDetail/${item.fdCategory}/${item.fdNo}`, {
      state: { item: item },
    });
  };

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
    dispatch(fetchRecent(user?.userId));
    user
      ? dispatch(fetchLikeFood(user?.userId))
      : dispatch(fetchLikeFood(null));
  }, [user]);

  return (
    <RecentFoodSectionBlock>
      <div className="h1__tag">
        <h1>최근 본 음식 리스트</h1>
        <span className="under__line"></span>
      </div>
      {recentList?.length === 0 ? (
        <div className="recent__nolist">
          <figure className="recent__nolist__listIco">
            <img src={ListImg} alt="리스트gif이미지" />
          </figure>
          <h1 style={{ fontSize: "1.5em", color: "#666666" }}>
            최근 본 음식이 없습니다.
          </h1>
        </div>
      ) : (
        <ul>
          {recentList?.map((item) => (
            <li key={item.fdNo}>
              <div className="info__wrapper">
                <Figure onClick={() => goToDetail(item)}>
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
      )}
    </RecentFoodSectionBlock>
  );
};

export default RecentFoodSection;
