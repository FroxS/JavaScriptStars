const Star = require("../Model/Star");
const Constelation = require("../Model/Constelation");

class StarControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async list(req, res) {
    let star = new Star(this.#db);
    if (req.query.constelation) {
      var data = await star.getStarsByConsteletaion(req.query.constelation);
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

  async editimagePOST(req, res) {
    // let star = new Star(this.#db);
    // star.loadData(req.body);
    // if (await star.validate()) {
    //   star.update();
    // } else {
    //   res.redirect(`/star/edit?id=${req.query.id}`);
    //   return;
    // }
    // res.redirect("/star");
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
    var star = new Star(this.#db);
    star.getUploader().single("image")(req, res, async (err) => {
      star.loadData(req.body);
      if (err) {
        // Błąd przetwarzania pliku
        console.error(err);
        req.session.wrongMessage = `Błąd przetwarzania pliku`;
        var data = { star: star };
        res.render("stars_add", { data });
        return;
      }

      if (req.file) {
        const separatorIndex = req.file.path.indexOf("\\");
        if (separatorIndex !== -1) {
          star.image = req.file.path.substr(separatorIndex);
        } else {
          star.image = req.file.path;
        }
      }
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
      req.session.successMessage = `Udało się dodać gwiaze o id ${star.id}`;
      res.redirect("/star");
    });
  }
}

module.exports = StarControler;
