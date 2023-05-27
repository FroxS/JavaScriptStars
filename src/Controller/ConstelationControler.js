const Constelation = require("../Model/Constelation");
const Star = require("../Model/Star");

class ConstelationControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async list(req, res) {
    let constelation = new Constelation(this.#db);
    var data = undefined;
    if (req.query.cloud && req.query.moon && req.query.fog) {
      data = await constelation.getConstelationQuery(
        req.query.cloud,
        req.query.moon,
        req.query.precipitation,
        req.query.fog
      );
      if (data.length <= 0) {
        req.session.wrongMessage =
          "Nie znaleziono konstelacji o takich kryteriach";
        res.redirect("/");
        return;
      }
    }
    if (data == undefined) data = await constelation.getItems();
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
    req.session.wrongMessage = `Nie znaleziono konstelacji o id = ${req.query.id}`;
    res.redirect("/constelation");
  }

  async editPOST(req, res) {
    let constelation = new Constelation(this.#db);
    constelation.loadData(req.body);
    if (await constelation.validate()) {
      constelation.update();
    } else {
      req.session.wrongMessage = `Nieprawidłowe dane`;
      res.redirect(`/constelation/edit?id=${req.query.id}`);
      return;
    }
    req.session.successMessage = `Udało się edytować konstelacje ${constelation.name}`;
    res.redirect("/constelation");
  }

  async deletePOST(req, res) {
    if (req.body.id) {
      let constelation = new Constelation(this.#db);
      if (constelation.exist(req.body.id)) {
        constelation.delete(req.body.id);
      } else {
        req.session.wrongMessage = `Nie znaleziono konstelacji o id ${req.body.id}`;
      }
    }

    req.session.successMessage = `Udało się usunąć konstelecje o id ${req.body.id}`;
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
    var constelation = new Constelation(this.#db);
    constelation.getUploader().single("image")(req, res, async (err) => {
      constelation.loadData(req.body);
      if (err) {
        // Błąd przetwarzania pliku
        console.error(err);
        req.session.wrongMessage = `Błąd przetwarzania pliku`;
        var data = { constelation: constelation };
        res.render("constelation_add", { data });
        return;
      }

      if (req.file) {
        const separatorIndex = req.file.path.indexOf("\\");
        if (separatorIndex !== -1) {
          constelation.image = req.file.path.substr(separatorIndex);
        } else {
          constelation.image = req.file.path;
        }
      }

      if (await constelation.validate()) {
        await constelation.save();
      } else {
        req.session.wrongMessage = `Nieprawidłowe dane`;
        let star = new Star(this.#db);
        var data = {
          constelation: constelation,
          stars: await star.getItems(),
        };
        let error = constelation.errors;
        res.render("constelation_add", { data, error });
        return;
      }
      req.session.successMessage = `Udało się dodać konstelecje o id ${constelation.id}`;
      res.redirect("/constelation");
    });
  }
}

module.exports = ConstelationControler;
