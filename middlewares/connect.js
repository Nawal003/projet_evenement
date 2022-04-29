const mysql = require("mysql");
const DB_URI =
  "mysql://bbt1oyn1eb77tvar:rtajd24g50yl8p70@clwxydcjair55xn0.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/lwabhjbsamz9fp3y";
let connection = mysql.createConnection({
  host: "clwxydcjair55xn0.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "bbt1oyn1eb77tvar",
  password: "rtajd24g50yl8p70",
  database: "lwabhjbsamz9fp3y",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
let disconnect = () => {
  console.log(disconnect);
  return connection.end();
};

module.exports = { connection, disconnect };
