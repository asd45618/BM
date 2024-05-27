// 데이터베이스 연결하기
import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "BM",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error: ", err);
    return;
  }
  console.log("Connection to the database.");
});
