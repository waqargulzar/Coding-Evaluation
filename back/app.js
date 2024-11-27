const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");

var app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(cors());
app.post("/signUp", verify, function (request, response) {
    const req = request.body;
    console.log(req);
    response.json("hello")
})
app.post("/signIn", function (request, response) {
    response.json("Hello World!")
})
app.listen(8000, function () {
    console.log("Started application on port %d", 10000)
});
