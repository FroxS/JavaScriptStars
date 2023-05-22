const Database = require("./src/Database");
const StarControler = require("./src/Controller/StarControler");
const ConstelationControler = require("./src/Controller/ConstelationControler");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.locals.baseURL = "http://localhost:3000/";
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "javascript",
};

const db = new Database(config);
const constelationController = new ConstelationControler(db);
const starController = new StarControler(db);

app.use(express.static(__dirname + "/public"));

//STARS
app.get("/", starController.list.bind(starController));
app.get("/star", starController.list.bind(starController));

app.get("/star/edit", starController.editGET.bind(starController));
app.post("/star/edit", (req, res, next) => {
  if (req.body.delete) {
    starController.deletePOST(req, res, next);
  } else {
    starController.editPOST(req, res, next);
  }
});

app.post("/star/remove", starController.deletePOST.bind(starController));

app.get("/star/add", starController.addGET.bind(starController));
app.post("/star/add", starController.addPOST.bind(starController));

//CONSTELATION

app.get(
  "/constelation",
  constelationController.list.bind(constelationController)
);

app.get(
  "/constelation/edit",
  constelationController.editGET.bind(constelationController)
);
app.post("/constelation/edit", (req, res, next) => {
  if (req.body.delete) {
    constelationController.deletePOST(req, res, next);
  } else {
    constelationController.editPOST(req, res, next);
  }
});

app.post(
  "/constelation/remove",
  constelationController.deletePOST.bind(constelationController)
);

app.get(
  "/constelation/add",
  constelationController.addGET.bind(constelationController)
);
app.post(
  "/constelation/add",
  constelationController.addPOST.bind(constelationController)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
