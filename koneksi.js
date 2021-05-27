var mysql = require("mysql");

// buat koneksi database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restapidb",
});

conn.connect((err) => {
  if (err) {
    console.log("Mysql terkoneksi");
  } else {
    console.log("Connected!:)");
  }
});
