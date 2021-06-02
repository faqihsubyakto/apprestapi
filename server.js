const express = require("express");
const bodyParser = require("body-Parser");
const app = express();

var morgan = require("morgan");

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
//panggil routes
var routes = require("./routes");
routes(app);

// daftarkan menu routes dari index
app.use("/auth", require("./midllewere"));

app.listen(3001, () => {
  console.log(`Server started on port 3000`);
});
