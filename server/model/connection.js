const mysql = require('mysql');

const dbURL = process.env.CLEAR_DB_URL || null;
const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "",
  database: "job",
};
const con = mysql.createConnection(dbURL || connectionOptions);


module.exports = con;
