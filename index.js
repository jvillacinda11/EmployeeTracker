const inquirer = require('inquirer')
const mysql2 = require('mysql2')

const db = mysql2.createConnection('mysql://root:rootroot@localhost/employees_db')

const start = () =>{
inquirer.prompt([
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [ 'Add Departments', 'Add Roles', 'Add Employees', 'View departments', 'View Roles', 'View Employees', 'Update Employee Role', 'Update Employee Manager', 'View Employees by Manager', 'Delete Departments', 'Delete Roles', 'Delete Employees', 'Exit']
  }
])
.then( res => {
  switch (res.choice) {
    case 'Add Departments':
      addDepartments()
      break;
    case 'Add Roles':
      // addRoles()
      start()
      break;
    case 'Add Employees':
      //addEmployees()
      start()
      break;
    case 'View departments':
      viewDepartments()
      break;
    case 'View Roles':
      viewRoles()
      break;
    case 'View Employees':
      viewEmployees()
      break;
    case 'Update Employee Role':
      // updateEmployees()
      break;
    case 'Update Employee Manager':
      console.log('FUNCTION NOT FOUND')
      start()
      break;
    case 'Delete Departments':
      console.log('FUNCTION NOT FOUND')
      break;
    case 'Delete Roles':
      console.log('FUNCTION NOT FOUND')
      start()
      break;
    case 'Delete Employees':
      console.log('FUNCTION NOT FOUND')
      start()
      break;
    case 'View Employees by Manager':
      console.log('FUNCTION NOT FOUND')
      start()
      break;
    case 'Exit':
      process.exit()
      break;
  }
})
}
start()

const viewEmployees = ()=>{
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS 'department', CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id`, (err, employee) => {
  console.log('')
  console.table(employee)
  start()
})
}

const viewDepartments = () =>{

  db.query(`SELECT department.id, department.name FROM department`, (err, department) =>{
    console.log('')
    console.table(department)
    start()
  })
}

const viewRoles = () =>{
  db.query(`SELECT role.id, role.title, role.salary FROM role`,(err, role) =>{
    console.log('')
    console.table(role)
    start()
  })
}

const addDepartments = ()=>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What would you like to name the department?'
    }
  ])
  .then(({newDepartment} )=>{
    db.query(`INSERT INTO department(name) VALUES('${newDepartment}') `, (err, result)=>{
      if(err){console.log(err)}
      else{console.log('New Department Added!')}
      start()
    })
  })
}

