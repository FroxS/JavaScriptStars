const Database = require("./src/Database");
const StarControler = require("./src/Controller/StarControler");
const ConstelationControler = require("./src/Controller/ConstelationControler");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const HomeControler = require("./src/Controller/HomeControler");
const app = express();

app.locals.baseURL = "http://localhost:3000/";
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var path = require("path");
global.appRoot = path.resolve(__dirname);

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "javascript",
};

app.locals.monDescription = {
  1: "Nów",
  2: "Pierwsza kwarta",
  3: "Pełnia",
  4: "Trzecia kwarta",
};

app.locals.precipitationDescription = {
  0: "Brak opadów atmosferycznych",
  1: "Deszcz",
  2: "Grad",
  3: "Śnieg",
};

// Konfiguracja sesji
app.use(
  session({
    secret: "secret-key", // Klucz używany do podpisywania sesji
    resave: true, // Czy ponownie zapisywać sesję przy każdym żądaniu, nawet jeśli się nie zmieniła
    saveUninitialized: false, // Czy zapisywać sesję, nawet jeśli nie została zmieniona
  })
);

// Middleware dla szablonów
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const db = new Database(config);
const constelationController = new ConstelationControler(db);
const homeControler = new HomeControler(db);
const starController = new StarControler(db);

app.use(express.static(__dirname + "/public"));

//PAGE NOT FOUND

//STARS
app.get("/", homeControler.home.bind(homeControler));
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
// Definiowanie ścieżki dla strony 404
app.use((req, res, next) => {
  res.status(404).render("pageNotFound");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
