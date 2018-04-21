

// required components
var inquirer = require('inquirer');
var mysql = require('mysql');

// MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: '',
	database: 'bamazon_DB'
});