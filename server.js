const express = require("express");
const bodyParser = require("body-Parser");
const app = express();
const port = 3000;
// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//panggil routes
var routes = require("./routes");
routes(app);

app.listen(port, () => {
  console.log(`Server started on port`);
});
