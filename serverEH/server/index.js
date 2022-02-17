"use strict";
const Functions = require("./functions.js");
const Hapi = require("@hapi/hapi");
const Mongo = require("./mongo.js");
const Database = new Mongo();

var Controllers = {};

let svDetails = {
  host: "0.0.0.0",
  port: 3000,
};

const server = Hapi.server(svDetails);

const routeCfg = {
  cors: {
    origin: ["*"],
    additionalHeaders: ["cache-control", "x-requested-with"],
  },
};

async function start() {
  if (!(await Database.connect())) return;
  Controllers.UserController = new Functions(Database.client);

  try {
    await server.start();
    console.log("\x1b[32m", svDetails.host + ":" + svDetails.port + " started");
    console.log("\x1b[0m");
  } catch (err) {
    console.log("Error starting server", err);
    process.exit(1);
  }
}

const endpoints = [
  {
    method: "POST",
    path: "/signUp",
    controller: "UserController",
    funct: "signUp",
  },

  {
    method: "POST",
    path: "/login",
    controller: "UserController",
    funct: "login",
  },

  {
    method: "POST",
    path: "/test",
    controller: "UserController",
    funct: "test",
  },

  {
    method: "GET",
    path: "/findByCustom",
    controller: "UserController",
    funct: "findByCustom",
  },

  {
    method: "POST",
    path: "/Bls",
    controller: "UserController",
    funct: "Bls",
  },

  {
    method: "GET",
    path: "/lessons",
    controller: "UserController",
    funct: "lessons",
  },

  {
    method: "GET",
    path: "/ehelp",
    controller: "UserController",
    funct: "ehelp",
  },

  {
    method: "GET",
    path: "/profil",
    controller: "UserController",
    funct: "profil",
  },
];

endpoints.map((endpoint) => {
  server.route({
    config: routeCfg,
    method: endpoint.method,
    path: endpoint.path,
    handler: async (request, h) => {
      // Message sent by client
      let paylod = request.payload;
      return await Controllers[endpoint.controller][endpoint.funct](paylod);
    },
  });
});

start();
