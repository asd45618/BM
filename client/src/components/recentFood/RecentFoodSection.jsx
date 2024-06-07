import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import Figure from "react-bootstrap/Figure";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikeFood, fetchRecent } from "../../store/food";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListImg from "@/assets/image/list_ico.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import { faCircleCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";

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
    .modify__btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ddd;
      margin-bottom: 30px;
      p {
        cursor: pointer;
      }
      .all__selected {
        font-size: 28px;
        cursor: pointer;
        color: #929292;
        span {
          font-size: 24px;
          color: #212529;
          margin-right: 10px;
        }
        svg {
          &.all__selected {
            color: var(--main);
          }
        }
      }
      .abc {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        p {
          text-align: center;
          margin: 0;
          padding: 5px;
          border: 1px solid #ddd;
          margin-left: 10px;
          &:nth-child(4) {
            border: none;
            margin: auto 0 auto 8px;
          }
        }
      }
    }
    li {
      border-bottom: 1px solid #ddd;
      margin-bottom: 2rem;
      .delete {
        .check {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 20px;
          margin: 10px 0;
          svg {
            cursor: pointer;
            color: #929292;
          }
          .delete__btn {
            svg {
              font-size: 20px;
            }
          }
          p {
            font-size: 16px;
            margin: 0;
          }
          svg {
            &.click {
              color: var(--main);
            }
          }
        }
      }
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

const serverUrl = import.meta.env.VITE_API_URL;

const RecentFoodSection = () => {
  const dispatch = useDispatch();
  const navgiate = useNavigate();

  const user = useSelector((state) => state.members.user);
  const like = useSelector((state) => state.foods.likeFood);
  const recentList = useSelector((state) => state.foods.recentList);

  const [selected, setSelected] = useState([]);
  const [recentModify, setRecentModify] = useState(true);
  const [all, setAll] = useState(false);

  const goToDetail = (item) => {
    navgiate(`/foodDetail/${item.fdCategory}/${item.fdNo}`, {
      state: { item: item },
    });
  };

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

  const deleteRecent = (item) => {
    axios
      .post(`${serverUrl}/food/deleteRecent`, {
        fdNo: item.fdNo,
        userId: item.userId,
      })
      .then(() => dispatch(fetchRecent(user?.userId)))
      .catch((err) => {
        console.log(err);
      });
  };

  const allDelete = () => {
    axios
      .post(`${serverUrl}/food/recentAllDelete`, { userId: user?.userId })
      .then(() => dispatch(fetchRecent(user?.userId)))
      .catch((err) => console.log(err));
  };

  const selectDelete = () => {
    axios
      .post(`${serverUrl}/food/recentSelectDelete`, {
        selected: selected,
        userId: user?.userId,
      })
      .then(() => dispatch(fetchRecent(user?.userId)))
      .catch((err) => alert(err.response.data));
  };

  const selectedBtn = (fdNo) => {
    selected.includes(fdNo)
      ? setSelected(selected.filter((item) => item !== fdNo))
      : setSelected((prevList) => [...prevList, fdNo]);
  };

  const modify = () => {
    setRecentModify(false);
  };

  const cancle = () => {
    setRecentModify(true);
  };

  const allSelect = () => {
    setAll(!all);
    if (selected.length && selected.length !== recentList.length) {
      setSelected([]);
      for (let i = 0; i < recentList.length; i++) {
        setSelected((prevList) => [...prevList, recentList[i].fdNo]);
      }
    } else if (selected.length === recentList.length) {
      setSelected([]);
    } else if (selected.length === 0) {
      for (let i = 0; i < recentList.length; i++) {
        setSelected((prevList) => [...prevList, recentList[i].fdNo]);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchRecent(user?.userId));
    user
      ? dispatch(fetchLikeFood(user?.userId))
      : dispatch(fetchLikeFood(null));
  }, [user]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

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
          <h1 style={{ fontSize: "1.5em", color: "#666" }}>
            최근 본 음식이 없습니다.
          </h1>
        </div>
      ) : (
        <ul>
          <div className="modify__btn">
            {recentModify ? (
              <p data-aos="fade-left" onClick={modify}>
                편집
              </p>
            ) : (
              <>
                <div
                  className="all__selected"
                  data-aos="fade-left"
                  onClick={allSelect}
                >
                  <span>All</span>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={all ? "all__selected" : ""}
                  />
                </div>
                <div className="abc">
                  <p data-aos="fade-left" onClick={allDelete}>
                    전체삭제
                  </p>
                  <p data-aos="fade-left" onClick={selectDelete}>
                    선택삭제
                  </p>
                  <p data-aos="fade-left" onClick={cancle}>
                    <FontAwesomeIcon icon={faXmark} />
                  </p>
                </div>
              </>
            )}
          </div>
          {recentList?.map((item) => (
            <li key={item.fdNo} data-aos="zoom-in-up" data-aos-offset="120">
              <div className="delete">
                {recentModify ? (
                  ""
                ) : (
                  <>
                    <div className="check" data-aos="fade-left">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        onClick={() => selectedBtn(item.fdNo)}
                        className={selected?.includes(item.fdNo) ? "click" : ""}
                      />
                      <p
                        className="delete__btn"
                        onClick={() => deleteRecent(item)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </p>
                    </div>
                  </>
                )}
              </div>
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
