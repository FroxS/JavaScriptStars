const Model = require("../Library/Model");
const DBModel = require("../Library/DBModel");

class Constelation extends DBModel {
  constructor(db) {
    super(db);
    this.id = 0;
    this.name = "";
    this.description = "";
    this.image = "";
    this.enable = 1;
    this.cloud_level = 1;
    this.phase_of_moon = 1;
    this.type_of_precipitation = 1;
    this.fog_density = 1;
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
      cloud_level: "Poziom zachmurzenia",
      phase_of_moon: "Faza księzyca",
      type_of_precipitation: "Rodzaj opadów atmosferycznych",
      fog_density: "Gęstość mgły",
    };
  }

  attributes() {
    return [
      "id",
      "name",
      "description",
      "image",
      "enable",
      "cloud_level",
      "phase_of_moon",
      "type_of_precipitation",
      "fog_density",
    ];
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

  async getConstelationQuery(cloud, moon, precipitation, fog) {
    let sql = `SELECT * FROM ${this.tableName()} WHERE cloud_level >= ${cloud} `;
    if (moon != undefined) sql += `AND phase_of_moon = ${moon} `;
    if (precipitation != undefined)
      sql += ` AND type_of_precipitation = '${precipitation}' `;
    sql += `AND fog_density >= ${fog} `;
    return await this._db.query(sql);
  }

  getMoonName(moon){
    switch(moon){
      case 1:
        return `Nów`;
      case 2:
        return `Pierwsza kwarta`;
      case 3:
        return `Pełnia`;
      case 4:
        return `Trzecia kwarta`;
      default:
        return ``
    }
  }

  getPrecipitationName(precipitation){
    switch(precipitation){
      case 0:
        return `Brak opadów atmosferycznych`;
      case 1:
        return `Deszcz`;
      case 2:
        return `Grad`;
      case 3:
        return `Śnieg`;
      default:
        return ``
    }
  }

}

module.exports = Constelation;
