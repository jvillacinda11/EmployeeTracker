CREATE DATABASE employees_db;

USE employees_db; 

CREATE TABLE department(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

USE employees_db;
CREATE TABLE role(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary decimal,
  department_id INT UNSIGNED NOT NULL,
  FOREIGN KEY  (department_id) REFERENCES department(id)
);

USE employees_db;
CREATE TABLE employee(
  id INT UNSIGNED PRIMARY KEY  AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id)
);

USE employees_db;
ALTER TABLE employee
ADD COLUMN manager_id INT UNSIGNED,
ADD CONSTRAINT fk_managerID
FOREIGN KEY (manager_id) REFERENCES employee(id);