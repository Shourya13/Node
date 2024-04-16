const { log } = require("console");
const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return keyPair;
}
const { publicKey, privateKey } = genKeyPair();

fs.writeFile("./id_rsa_pubKey.pem", publicKey, (err) => {
  if (err) throw err;
});

fs.writeFile("./id_rsa_pvtKey.pem", privateKey, (err) => {
  if (err) throw err;
});
