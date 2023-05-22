const Constelation = require("../Model/Constelation");
const Star = require("../Model/Star");

class ConstelationControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async list(req, res) {
    let star = new Constelation(this.#db);
    var data = await star.getItems();
    res.render("constelation", { data });
  }

  async editGET(req, res) {
    let constelation = new Constelation(this.#db);
    if (req.query.id) {
      if (await constelation.loadFromDatabaseById(req.query.id)) {
        let star = new Star(this.#db);
        var data = {
          constelation: constelation,
          stars: await star.getItems(),
        };
        res.render("constelation_edit", { data });
        return;
      }
    }
    res.redirect("/constelation");
  }

  async editPOST(req, res) {
    let constelation = new Constelation(this.#db);
    constelation.loadData(req.body);
    if (await constelation.validate()) {
      constelation.update();
    } else {
      res.redirect(`/constelation/edit?id=${req.query.id}`);
      return;
    }
    res.redirect("/constelation");
  }

  async deletePOST(req, res) {
    if (req.body.id) {
      let constelation = new Constelation(this.#db);
      if (constelation.exist(req.body.id)) {
        constelation.delete(req.body.id);
      }
    }
    res.redirect("/constelation");
  }

  async addGET(req, res) {
    let constelation = new Constelation(this.#db);
    let star = new Star(this.#db);
    var data = {
      constelation: constelation,
      stars: await star.getItems(),
    };
    res.render("constelation_add", { data });
    return;
  }

  async addPOST(req, res) {
    let constelation = new Constelation(this.#db);
    constelation.loadData(req.body);
    if (await constelation.validate()) {
      await constelation.save();
    } else {
      let star = new Star(this.#db);
      var data = {
        constelation: constelation,
        stars: await star.getItems(),
      };
      res.render("constelation_add", { data });
      return;
    }
    res.redirect("/constelation");
  }
}

module.exports = ConstelationControler;
