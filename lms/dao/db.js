var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'emandb.c3m6vgjobhcf.us-east-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'root',
    password : 'rootroot',
    database : 'lms'
});

module.exports = connection;