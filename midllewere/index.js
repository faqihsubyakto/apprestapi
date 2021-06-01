var express = require("express");
var auth = require("./auth");
var router = express.Router();
var Verifikasi = require("./verifikasi");

// menu registrasi
router.post("/api/v1/register", auth.registrasi);
router.post("/api/v1/login", auth.login);

// alamat yang perlu otorisasi
router.get("/api/v1/rahasia", Verifikasi(2), auth.halamanrahasia);

module.exports = router;
