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

//function readMessages(arg) {
//  console.log("request:");

  
//  const select = 'SELECT * FROM ';
//  var reqsql =                      // hier soll der befehl zusammengestellt werden. 
//  const output = connection.query(reqsql, )
//};

module.exports = { saveMessage }; 
