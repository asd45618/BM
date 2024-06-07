import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouletteModal from "./RouletteModal";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const RouletteBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px auto 100px;
  overflow: hidden;
  h1 {
    color: var(--main);
    font-size: 3em;
    font-family: var(--m-f-m);
    text-align: center;
  }
  .category__text {
    text-align: center;
    font-weight: bold;
    color: #9c9c9c;
    font-family: var(--m-f-n);
  }
  span {
    border-bottom: 2px solid var(--main);
    width: 40px;
    display: flex;
    text-align: center;
    margin: 0px auto 20px;
  }
  .desc {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    font-family: var(--m-f-n);
    color: #4b4b4b;
  }
  svg {
    color: #4b4b4b;
    font-size: 50px;
  }
  canvas {
    transition: 2s;
    pointer-events: none;
  }
  .start__btn {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    font-family: var(--m-f-m);
    background: #4b4b4b;
    color: white;
    transition: all 0.5s ease;
    &:hover {
      background: #fff;
      color: #4b4b4b;
    }
  }
  a {
    margin-top: 35px;
    border: 2px solid var(--main);
    font-family: var(--m-f-m);
    color: var(--main);
    padding: 10px;
    border-radius: 5px;
    transition: all 0.5s ease;
    &:hover {
      background: var(--main);
      color: white;
    }
  }
`;

const Roulette = () => {
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const list = useSelector((state) => state.foods.food);

  const colors = ["#61AEB1", "#8AC1C3", "#49BBBF"];

  const drawRoulette = (ctx, cw, ch) => {
    const arc = Math.PI / (list?.length / 2);

    for (let i = 0; i < list?.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
      ctx.fill();
      ctx.closePath();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "16px 'Do Hyeon', sans-serif";
    ctx.textAlign = "center";

    for (let i = 0; i < list?.length; i++) {
      const angle = arc * i + arc / 2;

      ctx.save();

      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50)
      );

      ctx.rotate(angle + Math.PI / 2);

      list[i]?.fdName.split(" ").forEach((text, j) => {
        ctx.fillText(text, 0, 20 * j);
      });

      ctx.restore();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const [cw, ch] = [canvas.width / 2, canvas.height / 2];

    drawRoulette(ctx, cw, ch);
  }, [list]);

  const rotate = () => {
    const canvas = canvasRef.current;
    canvas.style.transform = `initial`;
    canvas.style.transition = `initial`;

    setTimeout(() => {
      const ran = Math.floor(Math.random() * list?.length);
      const arc = 360 / list?.length;
      const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

      canvas.style.transform = `rotate(-${rotate}deg)`;
      canvas.style.transition = `2s`;

      setTimeout(() => {
        setResult(list[ran]);
        setShowModal(true);
      }, 2200);
    }, 1);
  };

  const reSpin = (value) => {
    setShowModal(value);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <RouletteBlock>
      <h1 data-aos="zoom-out">배민 룰렛</h1>
      <p data-aos="zoom-out" className="category__text">
        랜덤 메뉴 추천
      </p>
      <span data-aos="zoom-out"></span>
      <p data-aos="zoom-out" className="desc">
        가운데 start 버튼을 클릭하면 룰렛이 돌아갑니다.
      </p>
      <FontAwesomeIcon data-aos="zoom-out" icon={faCaretDown} />
      <canvas
        data-aos="zoom-out"
        width="400"
        height="400"
        ref={canvasRef}
      ></canvas>
      <button className="start__btn" onClick={rotate}>
        start
      </button>
      <Link
        data-aos="zoom-out"
        data-aos-anchor-placement="top"
        to={"/foodRecommend"}
        className="category"
      >
        카테고리 선택하러 가기
      </Link>
      {showModal && <RouletteModal result={result} reSpin={reSpin} />}
    </RouletteBlock>
  );
};

export default Roulette;
