const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("server started");
})
app.use(express.static("./public/uploads"))

const routeController = require("./routes/v1")()
const bodyParser = require("body-parser")


app.use(bodyParser.json({ extended: true }))
app.use("/api/v1", routeController)