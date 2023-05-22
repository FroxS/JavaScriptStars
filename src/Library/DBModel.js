const Model = require("../Library/Model");

class DBModel extends Model {
  constructor(db) {
    super(db);
  }

  tableName() {
    throw new Error("tableName() method must be implemented.");
  }

  primaryKey() {
    throw new Error("primaryKey() method must be implemented.");
  }

  attributes() {
    throw new Error("primaryKey() method must be implemented.");
  }

  async save(attributes) {
    if (!attributes) {
      attributes = this.attributes().filter((x) => x != this.primaryKey());
    }
    const startoDB = {};
    attributes.forEach((klucz) => {
      startoDB[klucz] = this[klucz];
    });
    return await this._db.insert(this.tableName(), startoDB);
  }

  async update(attributes) {
    if (!attributes) {
      attributes = this.attributes().filter((x) => x != this.primaryKey());
    }
    const test = {};
    attributes.forEach((klucz) => {
      test[klucz] = this[klucz];
    });
    await this._db.update(this.tableName(), this[this.primaryKey()], test);
  }

  async loadFromDatabaseById(id) {
    var datasql = await this.getItemBy(id);
    if (datasql.length == 0) return false;
    this.attributes().forEach((element) => {
      if (this.hasOwnProperty(element)) {
        this[element] = datasql[0][element];
      }
    });
    return true;
  }

  async getItems() {
    var sql = `SELECT ${this.attributes().join(",")} FROM  ${this.tableName()}`;
    return await this._db.query(sql);
  }

  async getItemBy(id) {
    var sql = `SELECT ${this.attributes().join(
      ","
    )} FROM ${this.tableName()} WHERE ${this.primaryKey()} = ${id}`;
    return await this._db.query(sql);
  }

  async delete(id) {
    this._db.delete(this.tableName(), id);
  }

  async exist(id) {
    var sql = `SELECT id FROM ${this.tableName()} WHERE id = ${id}`;
    let reslut = await this._db.query(sql);
    return reslut.lenght == 0 ? false : true;
  }
}

module.exports = DBModel;
