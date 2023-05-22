const Star = require("../Model/Star");

class HomeControler {
  #db;

  constructor(db) {
    this.#db = db;
  }

  home(req, res) {
    res.render("index");
  }

  async submit(req, res) {
    let star = new Star(this.#db);
    star.loadData(req.body);
    if (star.validate()) {
      let result = await this.#db.select("users");
      const users = result;
      console.log(users);
      let record = await this.#db.query(
        `SELECT id FROM users WHERE id = ?`,
        55
      );

      if (record.length > 0) {
        console.log("Istnieje");
      }

      res.render("users", { users });
      return;
    } else {
      console.log(star.errors);
    }

    /*
    if($music->validate() && $music->save()){
                    Application::$app->session->setFlash('success', 'Udało się oddać utwór');
                    Application::$app->response->redirect('/jsnuty/music');
                }else{
                    Application::$app->session->setFlash('error', 'Nie udało się dodać');
                }
    */
    res.render("index");
    return;
    const { name, secondName, email } = req.body;
    if (!name || !email || !secondName) {
      res.status(400).send("Name and email are required");
      return;
    }
    const user = { name, secondName, email };

    this.#db.insert("users", user, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting user into database");
        return;
      }
      console.log("User added to database:", user);

      this.#db.select("users", (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error while trying to get users from database");
          return;
        }
        const users = result;
        res.render("users", { users });
      });
    });
  }
}

module.exports = HomeControler;
