//delete functions only work if no employees are in the the roles or department that are trying to be deleted

const inquirer = require('inquirer')
const mysql2 = require('mysql2')

const db = mysql2.createConnection('mysql://root:rootroot@localhost/employees_db')

const start = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View Employees', 'View Employees by Manager', 'View Departments', 'View Roles', 'Add Departments', 'Add Roles',  'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Delete Employees', 'Delete Departments', 'Delete Roles', 'Exit']
    }
  ])
    .then(res => {
      switch (res.choice) {
        case 'Add Departments':
          addDepartments()
          break;
        case 'Add Roles':
          addRoles()
          break;
        case 'Add Employee':
          addEmployees()
          break;
        case 'View Departments':
          viewDepartments()
          break;
        case 'View Roles':
          viewRoles()
          break;
        case 'View Employees':
          viewEmployees()
          break;
        case 'Update Employee Role':
          updateRole()
          break;
        case 'Update Employee Manager':
          updateManager()
          break;
        case 'Delete Departments':
          deleteDepartment()
          break;
        case 'Delete Roles':
          deleteRole()
          break;
        case 'Delete Employees':
          deleteEmployee()
          break;
        case 'View Employees by Manager':
          viewByManager()
          break;
        case 'Exit':
          process.exit()
          break;
      }
    })
}
start()

const viewEmployees = () => {
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

const viewDepartments = () => {

  db.query(`SELECT department.id, department.name FROM department`, (err, department) => {
    console.log('')
    console.table(department)
    start()
  })
}

const viewRoles = () => {
  db.query(`SELECT role.id, role.title, role.salary FROM role`, (err, role) => {
    console.log('')
    console.table(role)
    start()
  })
}

const addDepartments = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What would you like to name the department?'
    }
  ])
    .then(({ newDepartment }) => {
      db.query(`INSERT INTO department(name) VALUES('${newDepartment}') `, (err, result) => {
        if (err) {
           console.log(err) 
           process.exit()
          }
        else { console.log('New Department Added!') }
        start()
      })
    })
}

const addRoles = () => {
  db.query('SELECT * FROM department', (err, department) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What would you like to title the role?'
      },
      {
        type: 'float',
        name: 'salary',
        message: 'How much will the yearly salary be?(No commas. Number only!)'
      },
      {
        type: 'list',
        name: 'departmentId',
        choices: department.map(department => ({ name: `${department.name} ${department.id}`, value: department.id }))
      }
    ])
      .then(({ title, salary, departmentId }) => {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ('${title}', '${salary}', ${departmentId})`, err => {
          if (err) { 
            console.log(err)
           process.exit()
          }
          else { console.log(`${title} role has been added!`) }
          start()
        })
      })


  })
}
const addEmployees = () => {
  db.query('SELECT * FROM role', (err, role) => {
    db.query(`SELECT * FROM employee WHERE manager_id IS null`, (err, manager) => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: `Enter new employee's first name.`
        },
        {
          type: 'input',
          name: 'lastName',
          message: `Enter new employee's last name.`
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select role for new employee.',
          choices: role.map(role => ({ name: role.title, value: role.id }))
        },
        {
          type: 'list',
          name: 'managerId',
          message: 'Select the Manager for the new employee if applicable.',
          choices: manager.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })).concat(['NA'])
        }
      ])
        .then(({ firstName, lastName, roleId, managerId }) => {
          if (managerId === 'NA') {
            managerId = null
          }
          db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`, err => {
            if (err) { 
              console.log(err)
             process.exit()
            }
            console.log(`${firstName} ${lastName} has been added as an employee`)
            start()
          })
        })
    })
  })
}

const updateRole = () => {
  db.query(`SELECT * FROM employee`, (err, employee) => {
    db.query(`SELECT * FROM role`, (err, role) => {


      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Select an employee.',
          choices: employee.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
        },
        {
          type: 'list',
          name: 'roleUpdate',
          message: 'Select a new role.',
          choices: role.map(role => ({ name: role.title, value: role.id }))
        }
      ])
        .then(({ employee, roleUpdate }) => {
          db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleUpdate, employee], err => {
            if (err) { 
              console.log(err) 
              process.exit()
            }
            console.log('Role has been updated!')
            start()
          })
        })
    })
  })
}
const updateManager = () => {
  db.query(`SELECT * FROM employee`, (err, employee) => {
    db.query(`SELECT * FROM employee WHERE manager_id IS null`, (err, manager) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Select an employee.',
          choices: employee.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
        },
        {
          type: 'list',
          name: 'managerUpdate',
          message: 'Select a new Manager for this employee',
          choices: manager.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })).concat(['NA'])
        }
      ])
        .then(({ employee, managerUpdate }) => {
          if(managerUpdate === 'NA'){ managerUpdate = null}
          console.log([employee, managerUpdate])
          db.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [managerUpdate, employee], err => {
            if (err) {
               console.log(err)
               process.exit()
              }
            console.log('Manager has been updated!')
            start()
          })
        })
    })
  })
}
const viewByManager = () => {
  db.query(`SELECT * FROM employee WHERE manager_id IS null`, (err, manager) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'Select a Manager.',
        choices: manager.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }))
      }
    ])
      .then(({ manager }) => {
        db.query(`SELECT * FROM employee WHERE manager_id = ?`, manager ,  (err, employees) => {
          if(err){ 
            console.log(err)
            process.exit()
          }
          console.log('')
          console.table(employees)
          start()
        })
      })
  })
}

const deleteDepartment = () => {
db.query(`SELECT * FROM department`, (err, department) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'Choose a department.',
      choices: department.map(department => ({name: department.name, value: department.id}))
    }
  ])
  .then(({department}) => {
    db.query(`DELETE FROM department WHERE id = ?`, department, err => {
      if (err) { 
      console.log(err) 
      process.exit()
      }
      else{
      console.log('Department deleted!')
      start()
      }
    })
  })
})
}
const deleteRole = () => {
  db.query(`SELECT * FROM role`, (err, role) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Choose a role.',
        choices: role.map(role => ({ name: role.title, value: role.id }))
      }
    ])
      .then(({ role }) => {
        db.query(`DELETE FROM role WHERE id = ?`, role, err => {
          if (err) { 
            console.log(err) 
            process.exit()
          }
          else{
          console.log('Role deleted!')
          start()
          }
        })
      })
  })
}

const deleteEmployee = () => {
  db.query(`SELECT * FROM employee`, (err, employee) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Choose a employee.',
        choices: employee.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
      }
    ])
      .then(({ employee }) => {
        db.query(`DELETE FROM employee WHERE id = ?`, employee, err => {
          if (err) { 
            console.log(err)
          process.exit() }
          else{
          console.log('Employee deleted!')
          start()
          }
        })
      })
  })
}
