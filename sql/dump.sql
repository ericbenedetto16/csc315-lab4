CREATE DATABASE csc315_lab4;

CREATE TABLE weather (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(255) NOT NULL,
    zip INTEGER NOT NULL,
    unique(city, zip),
    temperature_f FLOAT NOT NULL,
    pressure FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE USER 'lab_user'@'localhost' IDENTIFIED BY 'supersecretpassword';

GRANT ALL PRIVILEGES ON csc315_lab4 . weather TO 'lab_user'@'localhost';