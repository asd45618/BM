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
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

export default authRouter;
