INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Sales");



INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", "120000.00", 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Engineer", "70000.00", 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", "65000.00", 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Manager", "49000.00", 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", "85000.00", 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", "55000.00", 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Admin Assistant", "30000.00", 4);



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "White", "1", "1");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Zach", "White", "1", "1");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Zach", "Sadovzky", "2", "1");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Rosy", "Wagoner", "3", "2");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kyle", "Almas", "4", "2");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Lucy", "Plant", "5", "3");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ringo", "Wagoner", "6", "4");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Cody", "Bones", "6", "4");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tony", "Hinchcliff", "7", "4");
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ariana", "Grande", "7", "4");




