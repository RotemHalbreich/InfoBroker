var admin = require("firebase-admin");

var serviceAccount = require("./broker-info-firebase-adminsdk-ojjwy-22ec4fa019.json");

fb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = fb