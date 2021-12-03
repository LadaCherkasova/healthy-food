const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '50mb'})); //=> req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/recipes", require("./routes/recipes"));
app.use("/settings", require("./routes/settings"));
app.use("/favorites", require("./routes/favorites"));

app.listen(5000, () => {
  console.log('server is running on port 5000')
});
