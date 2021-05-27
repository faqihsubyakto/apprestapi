"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");
  app.route("/").get(jsonku.index);
  app.route("/tampilkan").get(jsonku.tampilsemuamahasiswa);
  app.route("/id").get(jsonku.tampilberdasarkanid);
};
