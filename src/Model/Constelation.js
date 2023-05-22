const Model = require("../Library/Model");
const DBModel = require("../Library/DBModel");

class Constelation extends DBModel {
  constructor(db) {
    super(db);
    this.id = 0;
    this.name = "";
    this.description = "";
    this.stars = {};
  }

  rules() {
    return {
      name: [
        Model.RULE_REQUIRED,
        [Model.RULE_MIN, { min: 5 }],
        [Model.RULE_MAX, { max: 100 }],
      ],
      description: [
        Model.RULE_REQUIRED,
        [Model.RULE_MIN, { min: 5 }],
        [Model.RULE_MAX, { max: 255 }],
      ],
    };
  }

  tableName() {
    return "constelation";
  }

  primaryKey() {
    return "id";
  }

  labels() {
    return {
      name: "Nazwa konstelatcji",
      description: "Opis konstelatcji",
    };
  }

  attributes() {
    return ["id", "name", "description"];
  }

  async save() {
    let result = await super.save();
    if (Array.isArray(this.stars)) {
      await this.stars.forEach((elemtn) => {
        var data = { star_id: elemtn, constelation_id: result.insertId };
        this._db.insert("star_constelation", data);
      });
    } else {
      var data = {
        constelation_id: result.insertId,
        star_id: this.stars,
      };
      this._db.insert("star_constelation", data);
    }
    return result;
  }

  async update() {
    const sql = `DELETE FROM star_constelation WHERE constelation_id = ?`;
    let id = this[this.primaryKey()];
    await this._db.query(sql, id);
    if (Array.isArray(this.stars)) {
      await this.stars.forEach((elemtn) => {
        var data = { star_id: elemtn, constelation_id: id };
        this._db.insert("star_constelation", data);
      });
    } else {
      var data = { star_id: this.stars, constelation_id: id };
      this._db.insert("star_constelation", data);
    }
    await super.update();
  }

  async loadFromDatabaseById(id) {
    if (await super.loadFromDatabaseById(id)) {
      var constDb = await this._db.query(
        `SELECT star_id FROM star_constelation WHERE constelation_id =${id};`
      );
      this.stars = constDb.map((element) => element["star_id"]);
      return true;
    } else {
      return false;
    }
  }

  async delete(id) {
    const sql = `DELETE FROM star_constelation WHERE constelation_id = ?`;
    await this._db.query(sql, id);
    await super.delete(id);
  }
}

module.exports = Constelation;
