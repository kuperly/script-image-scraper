#!/usr/bin/env node
const yargs = require("yargs");
const mainScript = require("./index");

const argv = yargs
  .option("url", { alias: "u", require: true, type: "string" })
  .option("directory", { alias: "d", require: true, type: "string" }).argv;

mainScript.init(argv.url, argv.directory);
