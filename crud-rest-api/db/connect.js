const { MongoClient, Db } = require("mongodb");

let client = null;

function connect(url, callback) {
  if (client === null) {
    client = new MongoClient(url);

    client.connect((err) => {
      if (err) {
        client = null;
        callback(err); //  callback() fonction qui est passée en argument à une autre fonction. 
      } else {
        callback(); 
      }
    });
  } else {
    callback();
  }
}

function db() {
  var db = new Db(client, "utilisateurs");
  return db;
}

function fermer() {
  if (client) {
    client.close();
    client = null;
  }
}

module.exports = { connect, client, db, fermer };
