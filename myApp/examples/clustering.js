const cluster = require("cluster");

if (cluster.isPrimary) {
  //Is it file being executed in mastter mode?
  cluster.fork(); //Cause the App.js file to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");

  const app = express();

  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("Hi there fast");
  });

  app.listen(5000);
}
