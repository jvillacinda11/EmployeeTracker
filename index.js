const inquirer = require('inquirer')


inquirer.prompt([
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [ ]
  }
])