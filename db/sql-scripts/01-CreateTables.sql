CREATE DATABASE traingood;
USE traingood;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    pw VARCHAR(20) NOT NULL,
    phone_num VARCHAR(20),
    email VARCHAR(40),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    birthday DATETIME,
    pt_exp FLOAT,
    is_pt BOOLEAN NOT NULL,
    icon_url VARCHAR(255),
    pt_rate INT
);