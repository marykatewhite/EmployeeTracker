const mysql = require("mysql");
const { prompt } = require("inquirer");
const cTable = require("console.table");
const dbChanges = require("./routes");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Fr33dum!",
	database: "staffDB"
});

async function initHR() {
	
	connection.connect();


  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "ALL_EMPLOYEES"
        },
        {
          name: "New Employee",
          value: "NEW_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);
  switch (choice) {
    case "ALL_EMPLOYEES":
      return viewEmployees();

    case "NEW_EMPLOYEE":
      return newEmployee();

    case "VIEW_ROLES":
	  return viewRoles();
	  
    case "NEW_ROLE":
	  return newRole();
	  
    case "UPDATE_ROLE":
      return updateRole();

    case "VIEW_DEPARTMENTS":
      return viewDepartments();

    case "NEW_DEPARTMENT":
      return newDepartment();

    default:
      return quit();
  }
}

  async function newEmployee() {
	const roles = dbChanges.roleList();
	const roleChoices = roles.map(({id, title}) => ({
		id: id,
		title: title		
	}));
	console.log(roleChoices.title);
	// const departmentChoices = departments.map(({ id, name }) => ({
	// 	name: name,
	// 	value: id
	// }));
// 	const employee = await prompt([
// 		{
// 			name: 'title',
// 			message: 'First name: '
// 		},
// 		{
// 			name: 'last name',
// 			message: 'Last name: '
// 		},
// 		{
// 			type: 'list',
// 			name: 'role_title',
// 			message: 'Role: ',
// 			choices: roleChoices
// 		},
// 		{
// 			type: 'list',
// 			name: 'department_title',
// 			message: 'Department: ',
// 			choices: departmentChoices
// 		}
// 	]);
// 	await dbChanges.newEmployee(employee);
}


initHR();
