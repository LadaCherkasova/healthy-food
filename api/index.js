const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); //=> req.body
app.use(cors());

//ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/recipes", require("./routes/recipes"));
app.use("/settings", require("./routes/settings"));

app.listen(5000, () => {
  console.log('server is running on port 5000')
});
