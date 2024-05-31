import express from "express";
import { db } from "../db.js";

const foodRouter = express.Router();

foodRouter.get("/allList", (req, res) => {
  db.query("SELECT * FROM foodtbl", [], (err, result) => {
    if (err) {
      res.status(500).send("실패");
      throw err;
    } else {
      res.send(result);
    }
  });
});

foodRouter.get("/list", (req, res) => {
  const fdCategory = req.query.fdCategory;
  if (fdCategory === "all") {
    db.query("SELECT * FROM foodtbl", [], (err, result) => {
      if (err) {
        res.status(500).send("실패");
        throw err;
      } else {
        res.send(result);
      }
    });
  } else {
    db.query(
      "SELECT * FROM foodtbl WHERE fdCategory=?",
      [fdCategory],
      (err, result) => {
        if (err) {
          res.status(500).send("실패");
          throw err;
        } else {
          res.send(result);
        }
      }
    );
  }
});

foodRouter.post("/likeClick", (req, res) => {
  console.log(res.body);
  const { fdNo, userId } = req.body;
  db.query(
    "INSERT INTO liketbl (fdNo, userId) VALUES (?, ?)",
    [fdNo, userId],
    (err, result) => {
      if (err) {
        res.status(500).send("실패");
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

foodRouter.get("/like", (req, res) => {
  const userId = req.query.userId;
  db.query("SELECT * FROM liketbl WHERE userId=?", [userId], (err, result) => {
    if (err) {
      res.status(500).send("실패");
      throw err;
    } else {
      res.send(result);
    }
  });
});

export default foodRouter;
