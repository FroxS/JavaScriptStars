const { format } = require("mysql");
const Model = require("../Library/Model");
const DBModel = require("../Library/DBModel");
const Constelation = require("./Constelation");

class Star extends DBModel {
  constructor(db) {
    super(db);
    this.id = 0;
    this.name = "";
    this.description = "";
    this.constelations = {};
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
    return "star";
  }

  primaryKey() {
    return "id";
  }

  labels() {
    return {
      name: "Nazwa gwiazdy",
      description: "Opis gwiazdy",
    };
  }

  attributes() {
    return ["id", "name", "description"];
  }

  async save() {
    let result = await super.save();
    if (Array.isArray(this.constelations)) {
      await this.constelations.forEach((elemtn) => {
        var data = { star_id: result.insertId, constelation_id: elemtn };
        this._db.insert("star_constelation", data);
      });
    } else {
      var data = {
        star_id: result.insertId,
        constelation_id: this.constelations,
      };
      this._db.insert("star_constelation", data);
    }
    return result;
  }

  async update() {
    const sql = `DELETE FROM star_constelation WHERE star_id = ?`;
    let id = this[this.primaryKey()];
    await this._db.query(sql, id);
    if (Array.isArray(this.constelations)) {
      await this.constelations.forEach((elemtn) => {
        var data = { star_id: id, constelation_id: elemtn };
        this._db.insert("star_constelation", data);
      });
    } else {
      var data = { star_id: id, constelation_id: this.constelations };
      this._db.insert("star_constelation", data);
    }
    await super.update();
  }

  async loadFromDatabaseById(id) {
    if (await super.loadFromDatabaseById(id)) {
      var constDb = await this._db.query(
        `SELECT constelation_id FROM star_constelation WHERE star_id =${id};`
      );
      this.constelations = constDb.map((element) => element["constelation_id"]);
      return true;
    } else {
      return false;
    }
  }

  getStarsByConsteletaion(constelation) {
    var sql = `SELECT s.id as id_star ,s.name as name_star, s.description as description_star , c.id as id_constelation ,c.name as name_constelation ,c.description as description_constelation FROM  star as s INNER JOIN star_constelation as sc ON sc.star_id = s.id INNER JOIN constelation as c ON c.Id = sc.constelation_id WHERE c.id = '${constelation}'`;
    return this._db.query(sql);
  }

  getStars() {
    var sql = `SELECT s.id as id_star ,s.name as name_star, s.description as description_star FROM  star as s `;
    return this._db.query(sql);
  }

  async delete(id) {
    const sql = `DELETE FROM star_constelation WHERE star_id = ?`;
    await this._db.query(sql, id);
    await super.delete(id);
  }
}

module.exports = Star;