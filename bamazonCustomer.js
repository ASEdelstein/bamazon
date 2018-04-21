
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
	database: 'Bamazon'
});

// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: '',
	database: 'Bamazon'
});

// Initiate user search prompt
function customerPurchase() {
	// console.log('___ENTER customerPurchase___');

	// Allow the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the ID number of your selected purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
	

		var item = input.item_id;
		var quantity = input.quantity;

		// FInd ID in database and ensure that it is in stock
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			// If the item ID is not valid throw err msg.
			

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please try another ID.');
				updateInventory();

			} else {
				var productData = data[0];

				// If the product is in stock notify the customer
				if (quantity <= productData.stock_quantity) {
					console.log('Success!, Your product is in stock!');

					// Updated the quantity of stock upon successful selction of item ID
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
					

						// End the database connection
						connection.end();
					})
				} else {
					console.log('We apologize there is insufficient quantity to process your order. Please select something else.');

					updateInventory();
				}
			}
		})
	})
}

// This will update the inventory count and dispaly
function updateInventory() {


	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');

		var prodCount = '';
		for (var i = 0; i < data.length; i++) {
			prodCount = '';
			prodCount += 'Item ID: ' + data[i].item_id + '  //  ';
			prodCount += 'Product Name: ' + data[i].product_name + '  //  ';
			prodCount += 'Department: ' + data[i].department_name + '  //  ';
			prodCount += 'Price: $' + data[i].price + '\n';

			console.log(prodCount);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	customerPurchase();
	})
}

// runBamazon will execute the main application logic
function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	updateInventory();
}

// Run the application logic
runBamazon();