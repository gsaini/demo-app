const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
app.use(express.static("public"));
app.post("/submit", function (req, res) {
  console.info(req.body, "<<<<<");

  fs.readFile("myjsonfile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data); //now it an object
      obj.table.push(req.body); //add some data
      const json = JSON.stringify(obj); //convert it back to json
      fs.writeFile("./myjsonfile.json", json, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send({
          status: "ok",
          message: `I got the information`,
        });
      });
    }
  });
});
app.get("/users", (req, res) => {
  fs.readFile("myjsonfile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      var response = JSON.parse(data); //now it's an object
      res.send({ status: "ok", data: response.table });
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
