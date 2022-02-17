const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://lecamarian:12321q@cluster0.bnyca.mongodb.net/test";

module.exports = class Mongo {
    constructor() {
      this.client = new MongoClient(uri, {
        useUnifiedTopology: true,
      });
    }
  
    async connect() {
      console.clear();
      console.log("\x1b[36m%s\x1b[0m", "Connecting with mongo..");
      try {
        await this.client.connect();
        console.log("\x1b[32m", "connected");
      } catch (err) {
        console.log("\x1b[31m", "error : ", err);
      }
  
      console.log("\x1b[0m");
      return this.client.isConnected();
    }
  
    get isConnected() {
      return this.client.isConnected();
    }
  };
  