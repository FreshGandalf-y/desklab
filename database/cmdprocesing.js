const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.BD_HOST || "127.0.0.1",
  user: process.env.DB_USER || "belalangner",
  password: process.env.DB_PASS || "jesusdb",
  database: process.env.DB_NAME || "chatchronic"
});

connection.connect((err) => {
  if (err) {
    console.error("connection refused", err.message);
    process.exit(1);
  } else {
    console.log("conneted to database: ");
  }
})

function saveMessage({ myusrName, theLastCommand }) {

  const sql = 'INSERT INTO openchat (username, lastcommand) VALUES (?, ?)';
  connection.query(sql, [myusrName, theLastCommand], (err) => {
    if (err) {
      console.error("something went wrong:", err.message);
    } else {
      console.log('\x1b[33mcommand:\x1b[0m', myusrName, theLastCommand);
    }
  })
};

async function readMessages(jsoninput) {
  console.log("request message:", jsoninput);

  function readSQL(limit) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM openchat ORDER BY id DESC LIMIT ?',
        [limit], 
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      )
    })
  }

  switch (jsoninput.time) {
    case "last 20 messages":
      return readSQL(20);
    case "last 50 messages":
      return readSQL(50);
    case "last 100 messages":
      return readSQL(100);
    case "last 200 messages":
      return readSQL(200);
    case "last 300 messages":
      return readSQL(300);
    // later a few hour-cases:
    case "lasthour":
    case "last 2 hours":
    case "last 3 hours":
    case "last 5 hours":
    case "last 12 hours":
      console.log('Time is not implemented');
      return [];
    default:
      console.log('unknown param in readMessages', jsoninput);
      return [];

  }
}
  module.exports = { 
    readMessages,
    saveMessage 
  }; 
