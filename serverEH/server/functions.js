const mongo = require("mongodb");

const error = (dt) => {
  return JSON.stringify({
    error: true,
    data: dt,
  });
};

const success = (dt) => {
  return JSON.stringify({
    error: false,
    data: dt,
  });
};

module.exports = class Functions {
  constructor(client) {
    this.client = client;
  }

  collection(name) {
    const database = this.client.db("Emergency");
    return database.collection(name);
  }

  async signUp(user) {
    let query = {
      Username: user.Username,
    };
    let result = await this.findByCustom(query, "users");
    if (result.length > 0) {
      return error("Exista deja un utilizator cu username-ul acesta!");
    }

    if (user.Password === "") {
      return error("Parola nu a fost introdusa!");
    }

    user.addTime = Date.now();
    var inserted = await this.insertOne(user, "users");
    if (inserted) return success(inserted);
    else return error("Something went wrong!");
  }

  async login(user) {
    if (user.Username === "") {
      return error("Introduceti username-ul ");
    }
    if (user.Password === "") {
      return error("Introduceti parola");
    }
    let query = {
      Username: user.Username,
      Password: user.Password,
    };

    let result = await this.findByCustom(query, "users");
    if (result.length > 0) {
      return success(result);
    } else {
      return error("Numele de utilizator sau parola sunt incorecte");
    }
  }

  async Bls(id) {
    let query = {
      _id: id._id,
      content: id.content,
    };

    let result = await this.findByCustom(query, "Learning");
    if (result.length > 0) {
      return success(result);
    } else {
      return error("Couldn`t find user with this credentials");
    }
  }

  async profil(user) {
    let query = {
      Username: user.Username,
    };

    let result = await this.findByCustom(query, "users");
    if (result.length > 0) {
      return success(result);
    } else {
      return error("Detaliile nu au fost gasite");
    }
  }

  async lessons() {
    let query = {};

    let result = await this.findByCustom(query, "Learning");
    if (result.length > 0) {
      return success(result);
    } else {
      return error("Lectia nu a fost gasita");
    }
  }

  async ehelp() {
    let query = {};

    let result = await this.findByCustom(query, "ehelp");
    if (result.length > 0) {
      return success(result);
    } else {
      return error("Couldn`t find any lessons");
    }
  }

  async test(payload) {
    console.log("merge");
    return success("merge");
  }

  async insertOne(doc, col) {
    const collection = this.collection(col);

    const result = await collection.insertOne(doc);
    return result.insertedCount === 1 ? result.insertedId : null;
  }

  async findById(id, col) {
    var o_id = new mongo.ObjectID(id);
    const collection = this.collection(col);

    const query = collection.find({ _id: o_id });

    var result = [];

    await query.forEach((t) => result.push(t));
    return result[0];
  }

  async findByCustom(custom, col) {
    const collection = this.collection(col);

    const query = collection.find(custom);

    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }
};
