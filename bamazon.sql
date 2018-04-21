
-- Create a database called "Bamazon"--
CREATE DATABASE Bamazon;
USE Bamazon;

-- Table for products
CREATE TABLE products (
	item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(10) NOT NULL,
	price DECIMAL(4,2) NOT NULL,
	stock_quantity INTEGER(12) NOT NULL,
	PRIMARY KEY (item_id)

);

-- Prouct list with price and quantity --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Myers Rum", "Liqour", 20.00, 24),
		("Jameson", "Liqour", 25.00, 36),
		("Guinness", "Beer", 8.99, 100),
		("Belle Brillet", "Liquer", 47.00, 12),
		("Drambuie", "Liquer", 45.00, 24),
		("Pirates Booty", "Snack Goods", 3.99, 50),
		("La Chileana Salsa", "Snack Goods", 4.99, 20),
		("Riedel", "Stemware", 25.99, 150),
		("Ruffino Chianti Classico Riserva Ducale Oro", "Wine", 50.00, 36),
		("Petrus", "Wine", 1000.00, 12);

    