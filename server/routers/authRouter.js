import express from "express";
import { db } from "../db.js";

const authRouter = express.Router();

authRouter.post("/join", (req, res) => {
  const { userId, userPw, userName, zipCode, addr1, addr2 } =
    req.body.addMember;
  db.query(
    "INSERT INTO membertbl (userId, userPw, userName, zipCode, addr1, addr2) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, userPw, userName, zipCode, addr1, addr2],
    (err, result) => {
      if (err) {
        res.status(500).send("회원가입 실패");
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/login", (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;
  db.query(
    "SELECT * FROM membertbl WHERE userId=? AND userPw=?",
    [userId, userPw],
    (err, result) => {
      if (err) {
        res.status(500).send("회원가입 실패");
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/idcheck", (req, res) => {
  const userId = req.body.userId;
  db.query(
    "SELECT * FROM membertbl WHERE userId=?",
    [userId],
    (err, result) => {
      if (err) {
        res.status(500).send("회원가입 실패");
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/namecheck", (req, res) => {
  const userName = req.body.userName;
  db.query(
    "SELECT * FROM membertbl WHERE userName=?",
    [userName],
    (err, result) => {
      if (err) {
        res.status(500).send("회원가입 실패");
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/refresh", (req, res) => {
  const userId = req.body.userId;
  db.query(
    "SELECT * FROM membertbl WHERE userId=?",
    [userId],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

export default authRouter;
