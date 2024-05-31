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
  const fdNo = req.body.fdNo;
  const userId = req.body.userId;
  db.query(
    "SELECT * FROM liketbl WHERE fdNo=? AND userId=?",
    [fdNo, userId],
    (err, result) => {
      if (err) {
        res.status(500).send("실패");
        throw err;
      } else {
        if (result.length) {
          db.query(
            "DELETE FROM liketbl WHERE fdNo=? AND userId=?",
            [fdNo, userId],
            (deleteErr, deleteResult) => {
              if (deleteErr) {
                res.status(500).send("실패");
                throw deleteErr;
              } else {
                res.send(deleteResult);
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO liketbl (fdNo, userId) VALUES (?, ?)",
            [fdNo, userId],
            (insertErr, insertResult) => {
              if (insertErr) {
                res.status(500).send("실패");
                throw insertErr;
              } else {
                res.send(insertResult);
              }
            }
          );
        }
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

foodRouter.get("/allLike", (req, res) => {
  const userId = req.query.userId;
  const query =
    "SELECT l.userId, f.* FROM liketbl AS l JOIN foodtbl AS f ON l.fdNo = f.fdNo WHERE l.userId = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).send("실패");
      throw err;
    } else {
      res.send(result);
    }
  });
});

export default foodRouter;
