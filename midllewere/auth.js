var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// controller unutk register

exports.registrasi = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  var query = "SELECT email FROM ?? WHERE ??=?";
  // email dari user di tabel user dimana emailnya adalah email yang sudah terdaftar
  var table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      //   jika rows lenght/ di tabel email masih kosong maka di daftarkan ke insert into
      if (rows.length == 0) {
        //   jika email yang dimasukkan belum terdaftar maka dimasukkan ke table user
        var query = "INSERT INTO ?? SET ? ";
        var table = ["user"];
        query = mysql.format(query, table);
        // data yang di daftarkan diambil dari post array
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("berhasil menambahkan data user baru", res);
          }
        });
        // jika email sudah terdaftar maka notofikasi "email sudah terdaftar"
      } else {
        response.ok("email sudah terdaftar", res);
      }
    }
  });
};

// controller unutk login
exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };
  //   mengecek apakah email dan password sudah ada di tabel user atau belum
  var query = "SELECT * FROM ?? WHERE ??=? AND ??=? ";
  var table = ["user", "password", md5(post.password), "email", post.email];
  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      // jik sudah ada di table user maka (rows == 1) maka jalankan jwt
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });
        id_user = rows[0].id;

        var data = {
          id_user: id_user,
          acces_token: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET?";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "token jwt tergenerate",
              token: token,
              currCursor: data.id_user,
            });
          }
        });
      } else {
        //   jika email dan pasword yang di masukkan tidak ada di table user maka tampilkan email dan password salah
        res.json({ Error: true, massage: "email dan pasword salah" });
      }
    }
  });
};

// membuat halaman baru apakah bisa di akses atau tidak

exports.halamanrahasia = function (req, res) {
  response.ok("halaman ini hanya tersedia untuk user role=2", res);
};
