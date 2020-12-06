const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = require("./lib/Employee");
const render = require("./lib/htmlRenderer");

// Set output file path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Check to see if output directory exists and create it if it doesn't
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

// Start an empty employees array
let employees = [];

function main() {
    // Ask for employee information
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Name:',
                name: 'name',
            },
            {
                type: 'input',
                message: 'ID #:',
                name: 'id',
            },
            {
                type: 'input',
                message: 'Email Address:',
                name: 'email',
            },
            {
                type: 'list',
                message: 'Choose License:',
                choices: ["Manager", "Engineer", "Intern"],
                name: 'role',
            },
            // Prompt for office number if role is Manager
            {
                type: 'input',
                message: 'Office Number:',
                when: (answers) => answers.role === 'Manager',
                name: 'officeNumber',
            },
            // Prompt for github repo if role is Engineer
            {
                type: 'input',
                message: 'GitHub Repo:',
                when: (answers) => answers.role === 'Engineer',
                name: 'github',
            },
            // Prompt for school if role is Intern
            {
                type: 'input',
                message: 'School Name:',
                when: (answers) => answers.role === 'Intern',
                name: 'school',
            },
            {
                type: 'confirm',
                message: 'Do you have more employees to enter?',
                name: 'continue',
            }
        ])
        .then((response) => {
            // Choose which class to call depending on the employee's role
            switch (response.role) {
                case "Manager":
                    newEmployee = new Manager(response.name, response.id, response.email, response.officeNumber);
                    break;
                case "Engineer":
                    newEmployee = new Engineer(response.name, response.id, response.email, response.github);
                    break;
                case "Intern":
                    newEmployee = new Intern(response.name, response.id, response.email, response.school);
                    break;
                default:
                    break;
            }
            employees.push(newEmployee);
            if (response.continue) {
                // They want to enter more employees, so call the function again.
                main();
            } else {
                // Done entering, so render and then write the team.html file
                let fileContent = render(employees);
                fs.writeFile(outputPath, fileContent, (err) => {
                    // throws an error
                    if (err) throw err;
                    // success case, the file was saved
                    console.log('team.html written');
                });
            }
        }
        );
}

main();
