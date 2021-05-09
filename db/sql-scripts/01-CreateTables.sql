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
    icon_url VARCHAR(255)
);

CREATE TABLE pt_rate (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pt_id INT,
    rating INT
);