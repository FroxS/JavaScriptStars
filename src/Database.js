const mysql = require("mysql");

class Database {
  #connection;

  constructor(config) {
    this.#connection = mysql.createConnection(config);
  }

  connect() {
    this.#connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database:", err);
        return;
      }

      console.log("Connected to database.");
    });
  }

  insert(table, data, callback) {
    const sql = `INSERT INTO ${table} SET ?`;
    this.#connection.query(sql, data, callback);
  }

  insert(table, data) {
    const sql = `INSERT INTO ${table} SET ?`;
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, data, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  select(table, callback) {
    const sql = `SELECT * FROM ${table}`;
    this.#connection.query(sql, callback);
  }

  select(table) {
    const sql = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  query(sql, data) {
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, data, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  update(table, id, data, callback) {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    this.#connection.query(sql, [data, id], callback);
  }

  update(table, id, data) {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, [data, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  delete(table, id, callback) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    this.#connection.query(sql, id, callback);
  }

  delete(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  disconnect() {
    this.#connection.end();
    console.log("Disconnected from database.");
  }
}

module.exports = Database;
