const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.BD_HOST || "localhost",
  user: process.env.DB_USER || "belalangner",
  password: process.env.DB_PASS || "jesusdb",
  database: process.env.DB_NAME || "chatchronic"
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
  console.log("recived message @:", myusrName, theLastCommand, datetime); // Debug 

  const sql = 'INSERT INTO openchat (username, message, CURRENT_TIMESTAMP) VALUES (?, ?)';
  connection.query(sql, [myusrName, theLastCommand], (err) => {
    if (err) {
      console.error("something went wrong:", err.message);
    } else {
      console.log('last command saved: ${myusrName}: ${theLastCommand}');
    }
  })
};

  //function readMessages(arg) {
  //console.log("request message:");

  //if (arg.time === "last 20 messages") {
  //  readSQL(20);
  //} else if (arg.time === "last 50 messages") {
  //  readSQL(50);
  //} else if (arg.time === "last 100 messages") {
  //  readSQL(100);
  //} else if (arg.time === "last 200 messages") {
  //  readSQL(200);
  //} else if (arg.time === "last 300 messages") {
  //  readSQL(300);
  //} else if (arg.time === "last Hour") {

  //} else if (arg.time === "last hour") {

  //} else if (arg.time === "last 3 hours") {

  //} else if (arg.time === "last 5 hours") {

  //} else if (arg.time === "last 12 hours") {
    
  //} else {
  //  console.log('something went nasty in readMessages');
  //}
  
  function readSQL(arg) {
  //  const selectedMessages = connection.query('SELECT * FROM 'chatchronic' ORDER BY id DESC LIMIT ${arg}');        // is that right? i think i have to use a other connection... right? 

  }

//module.exports = { readMessages };
module.exports = { saveMessage }; 
