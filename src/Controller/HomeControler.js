const Star = require("../Model/Star");

class HomeControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  home(req, res) {
    res.render("home");
  }
}

module.exports = HomeControler;
