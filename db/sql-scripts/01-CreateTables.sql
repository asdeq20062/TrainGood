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
    icon_url TEXT
);

CREATE TABLE pt_rate (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pt_id INT,
    rating INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pt_id) REFERENCES users(id)
);

CREATE TABLE pt_comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    pt_id INT,
    comment TEXT,
    before_photo TEXT,
    after_photo TEXT,
    create_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);