const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Fr33dum!",
  database: "staffDB"
});
connection.connect();

class dbChanges {
  constructor(connection) {
    this.connection = connection;
  }

  viewEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  newEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  viewRoles() {
    return this.connection.query(
      " SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
    );
  }

  newRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  updateRole(role) {
    return this.connection.query(" ", role);
  }

  viewDepartments() {
    return this.connection.query(
      " SELECT * FROM department "
    );
  }

  addDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  roleList() {
	  return this.connection.query(
		  " SELECT id, title FROM role "
	  );
  }

  quit() {
    return "Goodbye!";
  }
}

module.exports = new dbChanges(connection);
