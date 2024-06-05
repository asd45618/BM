import express from "express";
import { db } from "../db.js";
import dayjs from "dayjs";

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
  const date = dayjs();
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
            "INSERT INTO liketbl (fdNo, userId, date) VALUES (?, ?, ?)",
            [fdNo, userId, date.format("YYYY-MM-DD HH:mm:ss")],
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
    "SELECT l.userId, f.* FROM liketbl AS l JOIN foodtbl AS f ON l.fdNo = f.fdNo WHERE l.userId = ? ORDER BY date DESC";
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).send("실패");
      throw err;
    } else {
      res.send(result);
    }
  });
});

foodRouter.post("/recent", (req, res) => {
  const { fdNo, userId } = req.body;
  const date = dayjs();
  const MAX_RECENTLY_VIEWED = 5;
  const query =
    "INSERT INTO recenttbl (fdNo, userId, date) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE date = ?";
  db.query(
    query,
    [
      fdNo,
      userId,
      date.format("YYYY-MM-DD HH:mm:ss"),
      date.format("YYYY-MM-DD HH:mm:ss"),
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("실패");
        throw err;
      } else {
        db.query(
          "SELECT COUNT(*) as count FROM recenttbl WHERE userId = ?",
          [userId],
          (countErr, countResult) => {
            if (countErr) {
              res.status(500).send("실패");
              throw err;
            } else {
              console.log(countResult[0].count);
              const count = countResult[0].count;
              if (count > MAX_RECENTLY_VIEWED) {
                db.query(
                  `DELETE FROM recenttbl
                   WHERE userId = ?
                   ORDER BY date ASC
                   LIMIT ?`,
                  [userId, count - MAX_RECENTLY_VIEWED]
                );
              }
            }
          }
        );
      }
    }
  );
});

foodRouter.get("/recentList", (req, res) => {
  const userId = req.query.userId;
  const query =
    "SELECT r.userId, f.* FROM recenttbl AS r JOIN foodtbl AS f ON r.fdNo = f.fdNo WHERE r.userId = ? ORDER BY date DESC";
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
