USE employees_db;

INSERT INTO department (name)
VALUES('Sales'),
('Marketing'),
('Engineering');

USE employees_db;
-- role_id 1
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 40000, 1),
('Head of Sales', 70000, 1),
('Junior Marketer', 45000, 2),
('Senior Marketer', 70000, 2),
'Head of Marketing', 100000, 2),
('Junior Engineer', 70000, 3),
('Senior Engineer', 100000, 3),
('Head Engineer', 120000, 3);

USE employees_db;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Charles', 'Victor', 8, NULL ),
('Chester', 'Nyguen', 5, NULL),
('Micheal', 'Smith', 2, NULL),
('John','Smith', 6, 1),
('Jane', 'Smith', 7, 1),
('Josh', 'Parker', 1, 3),
('Karen', 'Baker', 3,  2),
('Jaden', 'Villa', 4, 2);
