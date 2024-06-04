import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const RouletteBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px auto 100px;
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
  }
  span {
    border-bottom: 2px solid #ddd;
    width: 40px;
    display: flex;
    text-align: center;
    margin: 0px auto 20px;
  }
  .desc {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 50px;
  }
  svg {
    color: red;
    font-size: 36px;
  }
  canvas {
    transition: 2s;
    pointer-events: none;
  }
  .start__btn {
    position: absolute;
    width: 70px;
    height: 70px;
    top: 69%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
`;

const Roulette = () => {
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
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
  }, []);

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
        setResult(`오늘의 야식은?! ${list[ran].fdName} 어떠신가요?`);
      }, 2000);
    }, 1);
  };

  return (
    <RouletteBlock>
      <h1>배민 룰렛</h1>
      <p className="category__text">랜덤 메뉴 추천</p>
      <span></span>
      <p className="desc">가운데 start 버튼을 클릭하면 룰렛이 돌아갑니다.</p>
      <FontAwesomeIcon icon={faCaretDown} />
      <canvas width="400" height="400" ref={canvasRef}></canvas>
      <button className="start__btn" onClick={rotate}>
        start
      </button>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </RouletteBlock>
  );
};

export default Roulette;
