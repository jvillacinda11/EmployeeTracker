CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE role (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(25) UNIQUE NOT NULL,
    salary FLOAT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);