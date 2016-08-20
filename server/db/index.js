var mysql = require('mysql');
var express = require('express');


exports.connection = mysql.createConnection({
  user: 'root',
  password: 'hi',
  database: 'chat'
});

exports.connection.connect();

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
