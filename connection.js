const util = require ('util')
var mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fr33dum!",
  database: "staffDB"
});
connection.connect();
connection.query = util.promisify(connection.query)
module.exports = connection;