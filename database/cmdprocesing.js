const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "belalangner",
  password: "jesusdb",
  database: "chatchronic"
});

connection.connect((err) => {
  if (err) {
    console.error("connection refused", err.message);
    process.exit(1);
  } else {
    console.log("conneted to database ");
  }
})
 
function saveMessage({ myusrName, theLastCommand, datetime }) {
  console.log("recived message:", myusrName, theLastCommand, datetime); // Debug 

  const sql = 'INSERT INTO chatmessages (username, message, time_sent) VALUES (?, ?, ?)';
  connection.query(sql, [myusrName, theLastCommand, datetime], (err) => {
    if (err) {
      console.error("something went wrong:", err.message);
    } else {
      console.log('last command saved: ${myusrName}: ${theLastCommand}');
    }
  })
};

function readMessages(arg) {
  console.log("request message:");
  if (arg.time === "last 20 messages") {

  } else if (arg.time === "last 50 messages") {

  } else if (arg.time === "last 100 messages") {

  } else if (arg.time === "last 200 messages") {

  } else if (arg.time === "last 300 messages") {

  } else if (arg.time === "last Hour") {

  } else if (arg.time === "last hour") {

  } else if (arg.time === "last 3 hours") {

  } else if (arg.time === "last 5 hours") {

  } else if (arg.time === "last 12 hours") {
    
  } else {
    console.log('something went nasty in readMessages');
  }
  const select = 'SELECT * FROM ';
  var reqsql =                      // hier soll der befehl zusammengestellt werden. 
  const output = connection.query(reqsql, )
};

module.exports = { readMessages };
module.exports = { saveMessage }; 
