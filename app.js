const mysql = require("mysql");
const { prompt } = require("inquirer");
const cTable = require("console.table");

const connection = require("./connection");


// formerly in the routes.js file which turned out to be a bridge too far
function viewEmployees() {
  return connection.query(
    "SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      console.table(res);
    }).then(initHR());
};

function newEmployee(employee) {
  console.log(employee);
  return connection.query("INSERT INTO employees SET ?", employee).then(initHR());
}

function viewRoles() {
  return connection.query(
    " SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department on role.department_id = department.id "
  ).then(initHR());
}

function newRole(role) {
  return connection.query("INSERT INTO role SET ?", role).then(initHR());
}

function updateRole(role) {
  return connection.query(" ", role).then(initHR());
}

function viewDepartments() {
  return connection.query(" SELECT * FROM department ").then(initHR());
}

function addDepartment(department) {
  return connection.query("INSERT INTO department SET ?", department).then(initHR());
}

// function roleList() {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT title FROM role", function(err, res) {
//       if (err) throw err;
//       resolve(res);
//     });
//   });
// }
// function findRoleID(roleName) {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT id FROM role WHERE title = ?", roleName, function(
//       err,
//       res
//     ) {
//       if (err) throw err;
//       resolve(res);
//     });
//   });
// }

// function managersList() {
//   return new Promise((resolve, reject) => {
//     connection.query("SELECT id, last_name FROM employees", function(err, res) {
//       if (err) throw err;
//       resolve(managerID);
//     });
//   });
// }

// function findManagerID(managerName) {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "SELECT id FROM employees WHERE last_name = ?",
//       managerName,
//       function(err, res) {
//         if (err) throw err;
//         resolve(res);
//       }
//     );
//   });
// }

function quit() {
  console.log("buhbye");
  connection.end();
}


async function initHR() {
  await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEWEMPLOYEES"
        },
        {
          name: "New Employee",
          value: "ADDEMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATEROLE"
        },
        {
          name: "View All Roles",
          value: "VIEWROLES"
        },
        {
          name: "Add Role",
          value: "ADDROLE"
        },
        {
          name: "View All Departments",
          value: "VIEWDEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADDDEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(function(choice) {
    console.log(choice);
    switch (choice.choice) {
    case "VIEWEMPLOYEES":
      viewEmployees();
      break;

    case "ADDEMPLOYEE":
      newEmployee();
      break;

    case "VIEWROLES":
    viewRoles();
    break;
	  
    case "ADDROLE":
    newRole();
    break;
	  
    case "UPDATEROLE":
      updateRole();
      break;

    case "VIEWDEPARTMENTS":
      viewDepartments();
      break;

    case "ADDDEPARTMENT":
      addDepartment();
      break;

    default:
      quit();
      break;
  }
  });
}

  async function newEmployee() {
	// const roles = await roleList();
	// const managers = await managersList();
	// const roleChoices = roles.map((roleitem) => roleitem.title);
	// const managerChoices = managers.map((manageritem) => manageritem.last_name);

	let employee = await prompt([
		{
			name: 'first_name',
			message: 'First name: '
		},
		{
			name: 'last_name',
			message: 'Last name: '
		},
		{
			name: 'role_id',
			message: 'Role ID: '
		},
		{
			name: 'manager_id',
			message: 'Manager ID: '
		}
	]
  )
  .then(function(employee) {
    console.log(employee);
  return connection.query("INSERT INTO employees SET ?", employee).then(initHR());
  })
  
  };

	// translate role_title into a role_id via the role database
	// let roleName = employee.role_id;
	// let managerName = employee.manager_id
	// findRoleID(roleName).then(console.log());

	// //translate the manager last_name into a manager_id via the employee database
	// findManagerID(managerName).then(console.log());


initHR();
