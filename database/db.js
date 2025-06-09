const mysql2=require('mysql2');

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root',
  database: 'the_eastern_gazette'
});

module.exports={db}