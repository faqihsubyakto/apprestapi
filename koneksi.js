var mysql = require("mysql");

// buat koneksi database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbrestapi",
});

conn.connect((err) => {
  if (err) {
    console.log("Mysql tidak terkoneksi");
  } else {
    console.log("Connected!:)");
  }
});
module.exports = conn;
