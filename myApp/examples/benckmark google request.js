const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});

      res.on("end", () => {
        console.log("req : ", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("hash: ", Date.now() - start);
  });
}

doRequest();

fs.readFile("./App.js", "utf-8", () => {
  console.log("fs : ", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
