const mysql = require('mysql2');

var container = mysql.createConnection({
  host: "localhost",
  user: "belalangner",
  password: "jesusdb",
  database: "chatchronic"
});

container.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database from cmdprocessing");
  
  

})





































