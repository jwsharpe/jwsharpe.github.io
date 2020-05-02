var express = require("express");
var app = express();

//setting middleware
app.use("/dependencies", express.static(__dirname + "/dependencies")); //Serves resources from public folder
app.use("/", express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
app.get("/javascript-technonaut/:fileName", function(req, res) {
  res.sendFile(`/javascript-technonaut/${req.params.fileName}.html`, {
    root: __dirname
  });
});
app.get("/:fileName", function(req, res) {
  res.sendFile(`${req.params.fileName}.html`, { root: __dirname });
});

const port = 5000;
app.listen(port);
console.log("APP is hosted on http://localhost:" + port);
