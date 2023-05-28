const Star = require("../Model/Star");
const Constelation = require("../Model/Constelation");
const f = require("session-file-store");

class StarControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async list(req, res) {
    var star = new Star(this.#db);
    var page = parseInt(req.query.page ?? 1);
    var row_count = parseInt(req.query.page_count ?? 5);
    if (req.query.constelation) {
      let count = parseInt(
        await star.getCountStarOfConstelation(req.query.constelation)
      );
      let pagination = this.getPagination(page, row_count, count);
      let offset = (page - 1) * row_count;
      var data = await star.getStarsByConsteletaion(
        req.query.constelation,
        offset,
        row_count
      );
      res.render("stars", { data, pagination });
    } else {
      let count = parseInt(await star.getCount());
      let offset = (page - 1) * row_count;
      var data = await star.getStars(offset, row_count);
      let pagination = this.getPagination(page, row_count, count);
      res.render("stars", { data, pagination });
    }
  }

  getPagination(actual_page, maxRows, coutData) {
    var pagination = {
      can_back: true,
      can_next: true,
      actual_page: actual_page,
      pages: [actual_page - 1, actual_page, actual_page + 1],
      row_count: maxRows,
    };

    var max_pages = Math.ceil(coutData / pagination.row_count); //= 9
    if (pagination.pages[2] > max_pages) {
      pagination.pages.pop();
      pagination.can_next = false;
    }
    if (pagination.pages[0] == 0) {
      pagination.pages.shift();
      pagination.can_back = false;
    }
    return pagination;
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
