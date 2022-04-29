const mysql = require("mysql");
const connectiondb = require("../middlewares/connect");

async function query(sql, params) {
  const connection = await connectiondb.connection;

  const results = connection.query(sql, params);
  results
    .on("error", function (err) {
      // Handle error, an 'end' event will be emitted after this as well
    })
    .on("fields", function (fields) {
      // the field packets for the rows to follow
    })
    .on("result", function (row) {
      // Pausing the connnection is useful if your processing involves I/O
      return row;

      // connection.pause();

      //   processRow(row, function () {
      //     connection.resume();
      //   });
    })
    .on("end", function () {
      // all rows have been received
      console.log("end evenement");
    });
}
module.exports = { query };
