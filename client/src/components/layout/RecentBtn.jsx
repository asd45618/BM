import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchRecent } from "../../store/food";
import { useNavigate } from "react-router-dom";

const RecentBtnBlock = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.5s;

  &.appear {
    opacity: 1;
    transform: translateY(0);
  }

  .rec__btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const RecentBtn = () => {
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
    <RecentBtnBlock>
      <div className="rec__btn" onClick={goToRecent}>
        {recentFood && recentFood.length > 0 && (
          <img src={recentFood[0]?.fdImg} alt={recentFood[0]?.fdName} />
        )}
      </div>
    </RecentBtnBlock>
  );
};

export default RecentBtn;
