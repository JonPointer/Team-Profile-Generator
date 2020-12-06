const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = require("./lib/Employee");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

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
    .then((answers) => {
        switch (answers.role) {
            case "Manager":
                newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                break;
            case "Engineer":
                newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                break;
            case "Intern":
                newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school);
                break;
            default:
                break;
        }
        employees.push(newEmployee);
        console.log(employees);
    }
    );

