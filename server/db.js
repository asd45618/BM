// 데이터베이스 연결하기
import mysql from "mysql";

export const db = mysql.createPool({
  host: "192.168.100.148",
  user: "newuser",
  password: "1234",
  database: "bm",
  connectionLimit: 10,
});

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection error: ", err);
//     return;
//   }
//   console.log("Connection to the database.");
// });
