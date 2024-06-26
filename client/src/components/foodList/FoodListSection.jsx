import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import axios from "axios";
import { fetchLikeFood, initFoods } from "../../store/food";
import AOS from "aos";
import "aos/dist/aos.css";

const FoodListSectionBlock = styled.div`
  margin: 130px 0 50px;
  padding: 0 30px;
  font-family: var(--m-f-m);
  .h1__tag {
    text-align: center;
    color: var(--main);
    .search {
      text-align: right;
      input {
        border-bottom: 1px solid var(--main);
        outline: none;
      }
      svg {
        cursor: pointer;
      }
    }
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
`;

const serverUrl = import.meta.env.VITE_API_URL;

const FoodListSection = ({ category }) => {
  const dispatch = useDispatch();
  const navgiate = useNavigate();
  const params = useParams();

  const list = useSelector((state) => state.foods.food);
  const user = useSelector((state) => state.members.user);
  const like = useSelector((state) => state.foods.likeFood);

  const [keyword, setKeyword] = useState("");

  const clickLikeBtn = (item) => {
    if (user) {
      axios
        .post(`${serverUrl}/food/likeClick`, {
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

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    axios
      .get(
        `${serverUrl}/food/search?keyword=${keyword}&category=${params.foodId}`
      )
      .then((res) => dispatch(initFoods(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    user ? dispatch(fetchLikeFood(user.userId)) : dispatch(fetchLikeFood(null));
  }, [user]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <FoodListSectionBlock>
      <div className="h1__tag">
        <h1>{category}</h1>
        <div className="search">
          <input
            type="text"
            onChange={changeKeyword}
            onKeyDown={(e) => activeEnter(e)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={search} />
        </div>
        <span className="under__line"></span>
      </div>
      <ul>
        {list?.map((item) => (
          <li key={item.fdNo} data-aos="zoom-in-up" data-aos-offset="100">
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
    </FoodListSectionBlock>
  );
};

export default FoodListSection;
