import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import axios from "axios";
import { fetchLikeFood } from "../../store/food";
import { useNavigate } from "react-router-dom";
import HeartImg from "@/assets/image/like_ico.gif";
import AOS from "aos";
import "aos/dist/aos.css";

const FoodLikeListSectionBlock = styled.div`
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
  .Like__nolist {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .Like__nolist__heartIco {
      border: 1px solid #ccc;
      padding: 25px;
      border-radius: 50%;
      margin-bottom: 50px;
      margin-top: 10px;
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

  const goToDetail = (item) => {
    navgiate(`/foodDetail/${item.fdCategory}/${item.fdNo}`, {
      state: { item: item },
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8001/food/allLike?userId=${user?.userId}`)
      .then((res) => {
        setUserLikeList(res.data);
      })
      .catch((err) => console.log(err));
    user
      ? dispatch(fetchLikeFood(user?.userId))
      : dispatch(fetchLikeFood(null));
  }, [like]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <FoodLikeListSectionBlock>
      <div className="h1__tag">
        <h1>좋아요리스트</h1>
        <span className="under__line"></span>
      </div>
      {userLikeList?.length === 0 ? (
        <div className="Like__nolist">
          <figure className="Like__nolist__heartIco">
            <img src={HeartImg} alt="" />
          </figure>
          <h1 style={{ fontSize: "1.5em", color: "#666666" }}>
            좋아요를 표시한 음식이 없습니다.
          </h1>
        </div>
      ) : (
        <ul>
          {userLikeList?.map((item) => (
            <li key={item.fdNo}>
              <div
                className="info__wrapper"
                data-aos="zoom-in-up"
                data-aos-anchor-placement="top-bottom"
              >
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
    </FoodLikeListSectionBlock>
  );
};

export default FoodLikeListSection;
