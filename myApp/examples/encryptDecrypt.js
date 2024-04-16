const crypto = require("crypto");
const fs = require("fs");

const publicKey = fs.readFileSync(`./id_rsa_pubKey.pem`, "utf-8");
const encryptedMessage = encryptWithPubKey(publicKey, "Hello World!");
console.log(encryptedMessage);

const privateKey = fs.readFileSync(`./id_rsa_pvtKey.pem`, "utf-8");
const decryptedMessage = decryptWithPvtKey(privateKey, encryptedMessage);
console.log(decryptedMessage);

function encryptWithPubKey(publicKey, message) {
  const bufferMessage = Buffer.from(message, "utf8");

  return crypto.publicEncrypt(publicKey, bufferMessage);
}

function decryptWithPvtKey(privateKey, encryptedMessage) {
  return crypto.privateDecrypt(privateKey, encryptedMessage).toString();
}
