const mysql = require("mysql");
const { prompt } = require("inquirer");
const cTable = require("console.table");

const connection = require("./connection");


// formerly in the routes.js file which turned out to be a bridge too far

// view employees table DONE
function viewEmployees() {
  connection.query('SELECT * FROM employees', function(err, res) {
    if (err) throw err;
    console.table(res);
  });
  initHR();
}

// view role table DONE
function viewRoles() {
  connection.query(
    ' SELECT * from role ',
    function(err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
  initHR();
}

// add a new role to role table DONE
async function newRole() {
  let department = await connection.query('SELECT id, name FROM department');   
  const departmentChoices = department.map(({ id, name }) => ({
		name: name,
		value: id		
  }));
  
  let addedrole = await prompt([
    {
      name: "title",
      message: "Role title: "
    },
    {
      name: "salary",
      message: "Role salary: "
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department: ",
      choices: departmentChoices
    }
  ]).then(function(addedrole) {
    connection.query(`INSERT INTO role SET ?`, addedrole);
    initHR();
  });
}

// update an employee's role in the role table DONE
async function updateRole() {
  let roleChange = await prompt([
    {
      name: "employee_id",
      message: "ID of employee: "
    },
    {
      name: "role_id",
      message: "New role ID: "
    }
  ]).then(function(roleChange) {
    connection.query(
      `UPDATE employees SET role_id = ${roleChange.role_id} WHERE id = ${roleChange.employee_id}`
    );
    console.log(`Successfully changed.`);
    initHR();
  });
}

// view department table DONE
function viewDepartments() {
  connection.query(' SELECT * FROM department ', function(err, res) {
    if (err) throw err;
    console.table(res);
  });
  initHR();
}

// add a new department to department table DONE
async function addDepartment() {
  let newdepartment = await prompt([
    {
      name: "name",
      message: "Department name: "
    }
  ])(function(newdepartment) {
  return connection.query(`INSERT INTO department SET ?`, newdepartment)
.then(initHR());
})
}

// add a new employee to employees table DONE
async function newEmployee() {
  let employee = await prompt([
    {
      name: "first_name",
      message: "First name: "
    },
    {
      name: "last_name",
      message: "Last name: "
    },
    {
      name: "role_id",
      message: "Which role ID?"
    },
    {
      name: "manager_id",
      message: "Which manager ID?"
    }
  ]).then(function(employee) {
    console.log(employee);
    return connection
      .query(`INSERT INTO employees SET ?`, employee)
      .then(initHR());
  });
}

// quit DONE
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

initHR();
