const Star = require("../Model/Star");
const Constelation = require("../Model/Constelation");

class StarControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async list(req, res) {
    let star = new Star(this.#db);
    if (req.query.consteletaion) {
      var data = await star.getStarsByConsteletaion(req.query.consteletaion);
      res.render("stars", { data });
    } else {
      var data = await star.getStars();
      res.render("stars", { data });
    }
  }

  async editGET(req, res) {
    let star = new Star(this.#db);
    if (req.query.id) {
      if (await star.loadFromDatabaseById(req.query.id)) {
        let constelation = new Constelation(this.#db);
        var data = {
          star: star,
          constelations: await constelation.getItems(),
        };
        res.render("stars_edit", { data });
        return;
      }
    }
    res.redirect("/star");
  }

  async editPOST(req, res) {
    let star = new Star(this.#db);
    star.loadData(req.body);
    if (await star.validate()) {
      star.update();
    } else {
      res.redirect(`/star/edit?id=${req.query.id}`);
      return;
    }
    res.redirect("/star");
  }

  async deletePOST(req, res) {
    if (req.body.id) {
      let star = new Star(this.#db);
      if (star.exist(req.body.id)) {
        star.delete(req.body.id);
      }
    }
    res.redirect("/star");
  }

  async addGET(req, res) {
    let star = new Star(this.#db);
    let constelation = new Constelation(this.#db);
    var data = {
      star: star,
      constelations: await constelation.getItems(),
    };
    res.render("stars_add", { data });
    return;
  }

  async addPOST(req, res) {
    let star = new Star(this.#db);
    star.loadData(req.body);
    if (await star.validate()) {
      await star.save();
    } else {
      let constelation = new Constelation(this.#db);
      var data = {
        star: star,
        constelations: await constelation.getItems(),
      };
      let error = star.errors;
      res.render("stars_add", { data, error });
      return;
    }
    res.redirect("/star");
  }
}

module.exports = StarControler;
