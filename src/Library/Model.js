const fs = require("fs");

class Model {
  _db;
  static RULE_REQUIRED = "required";
  static RULE_EMAIL = "email";
  static RULE_MIN = "min";
  static RULE_MAX = "max";
  static RULE_MATCH = "match";
  static RULE_UNIQUE = "unique";

  errors = {};

  constructor(db) {
    this._db = db;
  }

  rules() {
    throw new Error("rules() method must be implemented.");
  }

  loadData(data) {
    for (let [key, value] of Object.entries(data)) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    }
  }

  labels() {
    return {};
  }

  getLabel(attribute) {
    return this.labels()[attribute] || attribute;
  }

  getUploader() {
    const multer = require("multer");
    const { v4: uuidv4 } = require("uuid");
    const storage = multer.diskStorage({
      destination: "public/uploads/",
      filename: (req, file, cb) => {
        const fileExtension = file.originalname.split(".").pop();
        const uniqueFilename = `${uuidv4()}.${fileExtension}`;
        cb(null, uniqueFilename);
      },
    });
    return multer({ storage });
  }

  async validate() {
    this.errors = {};
    for (let [attribute, rules] of Object.entries(this.rules())) {
      let value = this[attribute];
      for (let rule of rules) {
        let ruleName = rule;
        if (typeof rule !== "string") {
          ruleName = rule[0];
        }

        if (ruleName === Model.RULE_REQUIRED && !value) {
          this.addErrorForRule(attribute, Model.RULE_REQUIRED, rule);
        }

        if (ruleName === Model.RULE_EMAIL && !/^\S+@\S+\.\S+$/.test(value)) {
          this.addErrorForRule(attribute, Model.RULE_EMAIL, rule);
        }

        if (ruleName === Model.RULE_MIN && value.length < rule[1].min) {
          this.addErrorForRule(attribute, Model.RULE_MIN, rule);
        }

        if (ruleName === Model.RULE_MAX && value.length > rule[1].max) {
          this.addErrorForRule(attribute, Model.RULE_MAX, rule);
        }

        if (ruleName === Model.RULE_MATCH && value !== this[rule[1].match]) {
          this.addErrorForRule(attribute, Model.RULE_MATCH, rule);
        }

        if (ruleName === Model.RULE_UNIQUE) {
          //this.#db.query
          let className = rule.class;
          let uniqueAttr = rule.attribute || attribute;
          let tableName = className.tableName();
          let record = await this._db.query(
            `SELECT id FROM ${tableName} WHERE ${uniqueAttr} = ?`,
            value
          );
          if (record) {
            this.addErrorForRule(attribute, Model.RULE_UNIQUE, {
              field: this.getLabel(attribute),
            });
          }
        }
      }
    }
    return Object.keys(this.errors).length === 0;
  }

  addErrorForRule(attribute, rule, params = {}) {
    let message = this.errorMessages()[rule] || "";
    for (let [key, value] of Object.entries(params[1])) {
      message = message.replace(`{${key}}`, value);
      if (this.labels()[value]) {
        message = message.replace("{label}", this.labels()[value]);
      }
    }
    if (!this.errors[attribute]) {
      this.errors[attribute] = [];
    }
    this.errors[attribute].push(message);
  }

  errorMessages() {
    return {
      [Model.RULE_REQUIRED]: "Te pole jest wymagane",
      [Model.RULE_EMAIL]: "Wpisz poprawny adres email",
      [Model.RULE_MIN]: "Minimalna długość tego pola to {min}",
      [Model.RULE_MAX]: "Maksymalna długość tego pola to {max}",
      [Model.RULE_MATCH]: "To pole nie pasuje do pola {label}",
      [Model.RULE_UNIQUE]: "Rekord z {field} już istnieje",
    };
  }

  hasError(attribute) {
    return this.errors.hasOwnProperty(attribute);
  }

  getFirstError(attribute) {
    return this.errors[attribute] && this.errors[attribute][0];
  }

  addError(attribute, message) {
    if (!this.errors[attribute]) {
      this.errors[attribute] = [];
    }
    this.errors[attribute].push(message);
  }

  deleteFile(fileName) {
    try {
      if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log("Plik został usunięty:", fileName);
        return true;
      } else {
        console.log("Plik nie istnieje:", fileName);
        return false;
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania pliku:", error);
      return false;
    }
  }
}

module.exports = Model;
