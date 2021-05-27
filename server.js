const express = require("express");
const bodyParser = require("body-Parser");
const app = express();
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//panggil routes
var routes = require("./routes");
routes(app);

app.listen(3000, () => {
  console.log(`Server started on port`);
});
