USE employees_db;

INSERT INTO department (name)
VALUES('Sales');

USE employees_db;

INSERT INTO department (name)
VALUES ('Marketing');

USE employees_db;

INSERT INTO department (name)
VALUES ('Engineering');

USE employees_db;
-- role_id 1
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 40000, 1);

USE employees_db;
-- role_id 2
INSERT INTO role (title, salary, department_id)
VALUES ('Head of Sales', 70000, 1);

USE employees_db;
-- role_id 3
INSERT INTO role (title, salary, department_id)
VALUES ('Junior Marketer', 45000, 2);

USE employees_db;
-- role_id 4
INSERT INTO role (title, salary, department_id)
VALUES ('Senior Marketer', 70000, 2);
USE employees_db;
-- role_id 5
INSERT INTO role (title, salary, department_id)
VALUES ('Head of Marketing', 100000, 2);

USE employees_db;
-- role_id 6
INSERT INTO role (title, salary, department_id)
VALUES ('Junior Engineer', 70000, 3);

USE employees_db;
-- role_id 7
INSERT INTO role (title, salary, department_id)
VALUES ('Senior Engineer', 100000, 3);

USE employees_db;
-- role_id 8
INSERT INTO role (title, salary, department_id)
VALUES ('Head Engineer', 120000, 3);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Charles', 'Victor', 8 );

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Chester', 'Nyguen', 5);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Micheal', 'Smith', 2);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John','Smith', 6, 1);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Smith', 7, 1);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Josh', 'Parker', 1, 3);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Karen', 'Baker', 3,  2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jaden', 'Villa', 4, 2);