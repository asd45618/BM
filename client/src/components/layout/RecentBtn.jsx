import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchRecent } from "../../store/food";
import { useNavigate } from "react-router-dom";

const RecentBtnBlock = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  animation: fadeInUp 0.5s;
  z-index: 99999;

  &.disappear {
    opacity: 0;
    animation: fadeInDown 0.5s;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }

  .rec__btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const RecentBtn = ({ scrollPosition }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recentFood = useSelector((state) => state.foods.recentList);
  const user = useSelector((state) => state.members.user);

  const goToRecent = () => {
    navigate("/recentFood");
  };

  useEffect(() => {
    user ? dispatch(fetchRecent(user?.userId)) : "";
  }, [user, dispatch]);

  return (
    <RecentBtnBlock className={scrollPosition ? "" : "disappear"}>
      <div className="rec__btn" onClick={goToRecent}>
        {recentFood && recentFood.length > 0 && (
          <img src={recentFood[0]?.fdImg} alt={recentFood[0]?.fdName} />
        )}
      </div>
    </RecentBtnBlock>
  );
};

export default RecentBtn;
