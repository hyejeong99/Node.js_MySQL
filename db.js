var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tkfkdgo09013',
    database: 'login_dataset'
});
db.connect();

module.exports = db;