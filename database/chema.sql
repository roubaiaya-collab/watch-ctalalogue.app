CREATE DATABASE watch_catalog;

USE watch_catalog;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500) NOT NULL
);
