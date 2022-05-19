// import fs from "fs"
// import inquire from "inquirer"
// import chalk from "chalk"
// import chalkAnimation from "chalk-animation"
// import figlet from "figlet"
// import { print, wait } from "./utils/index.js"
// import gradient from "gradient-string"
// import { createSpinner } from "nanospinner"

const inquire = require("inquirer")
const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const figlet = require("figlet")
const {print, wait} = require("./utils/index.js")
const gradient = require("gradient-string")
const { createSpinner } = require("nanospinner")

// create spinner
const spinner = createSpinner();


// Collect users data

async function askUserInfo() {

    print("")
    print("")
    print(gradient("cyan", "blue")(figlet.textSync("ROUND 1", {font: "Old Banner"})))
    print("")

    await wait(1)

    const questions = [
        {
            type: "input",
            name: "full_name",
            message: "Enter your full name",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("full name cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 30) {
                    inp = ""
                    error = chalk.redBright(" 😒 full name length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "tag_line",
            message: "Enter your tagline: eg (building the future...) ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("tagline cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 100) {
                    inp = ""
                    error = chalk.redBright(" 😒 tagline length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "intro_tag_line",
            message: "Enter your intro tagline: eg (inspiring fullstack engineer..) ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("intro tagline cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 100) {
                    inp = ""
                    error = chalk.redBright(" 😒 intro tagline length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "subtagline",
            message: "Enter your sub_tagline: eg (think, create, design...) ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("subtagline cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 100) {
                    inp = ""
                    error = chalk.redBright(" 😒 subtagline length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "tech_year",
            message: "When do you begin your tech journey (eg 2001): ",
            validate: (inp) => {
                let error;
                let currentYear = new Date().getFullYear()
                let techYear = parseInt(inp);

                if (inp === "") {
                    error = chalk.redBright("tech year cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 5) {
                    error = chalk.redBright(" 😒 invalid year ")
                    print(error)
                    return
                }
                if (techYear === NaN) {
                    error = chalk.redBright(" 😒 invalid year ")
                    print(error)
                    return
                }
                if (techYear > currentYear) {
                    error = chalk.redBright(`😒 invalid year. year cant be greater than current year (${currentYear}) `)
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "github_username",
            message: "Enter your github username (eg benrobo): ",
            validate: (inp) => {
                let error;

                if (inp === "") {
                    error = chalk.redBright("github username cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 30) {
                    error = chalk.redBright(" 😒 invalid github username ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill",
            message: "What your skill (eg Software Engineering): ",
            validate: (inp) => {
                let error;

                if (inp === "") {
                    error = chalk.redBright("skill cant be blank")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "quote",
            message: "What your favorite quote phrase? ",
            validate: (inp) => {
                let error;

                if (inp === "") {
                    error = chalk.redBright("quote phrase cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 500) {
                    error = chalk.redBright(" 😒 quote phrase is too long!. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "greeting_type",
            message: "Enter your greeting phrase: eg ( Hello | Hi | Hey ) ",
            validate: (inp) => {
                let error;

                if (inp === "") {
                    error = chalk.redBright("greeting type cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 20) {
                    error = chalk.redBright(" 😒 greeting type is too long!. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "bio",
            message: "Enter a short description about yourself : ",
            validate: (inp) => {
                let error;

                if (inp === "") {
                    error = chalk.redBright("quote phrase cant be blank")
                    print(error)
                    return
                }
                return true
            }
        }
    ]

    const usersBiosDescription = []
    const answers = await inquire.prompt(questions)

    usersBiosDescription.push(answers.bio)

    answers.bio = usersBiosDescription
    // start spinner
    spinner.start({text: "Saving Data..."})

    // save users data to a json file

    await wait(1)
    // stop spinner
    spinner.success({text: "Information saved successfully"})

    return true
}


async function askForUserSkills() {

    print("")
    print("")
    print(gradient("cyan", "blue")(figlet.textSync("ROUND 2", {font: "Old Banner"})))
    print("")

    await wait(1)

    print("")
    print(chalk.cyanBright("Enter atleast 3 preferable skills within your tech space which you are familiar with or will soon learn."))
    print("")

    const questions = [
        {
            type: "input",
            name: "skill1",
            message: "Skill 1 eg (Design, Frontend Development): ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("skill name cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 100) {
                    inp = ""
                    error = chalk.redBright(" 😒 skill name length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill1_desc",
            message: "Skill 1 brief description: ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("skill 1 description cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 300) {
                    inp = ""
                    error = chalk.redBright(" 😒 skill 1 description length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill1_project_completed",
            message: "Skill 1 projects completed (eg 20, 10,5): ",
            validate: (inp) => {
                let error;
                let projectsCompleted = parseInt(inp)
                if (inp === "") {
                    error = chalk.redBright("skill 1 projects completed cant be blank")
                    print(error)
                    return
                }

                if (projectsCompleted > 0 === false) {
                    error = chalk.redBright(" 😒 invalid number of projects completed. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill2",
            message: "Skill 2 eg (Backend development, Cloud Engineering): ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("skill name cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 100) {
                    inp = ""
                    error = chalk.redBright(" 😒 skill name length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill2_desc",
            message: "Skill 2 brief description: ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("skill 2 description cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 300) {
                    inp = ""
                    error = chalk.redBright(" 😒 skill 2 description length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill2_project_completed",
            message: "Skill 2 projects completed (eg 20, 10,5): ",
            validate: (inp) => {
                let error;
                let projectsCompleted = parseInt(inp)
                if (inp === "") {
                    error = chalk.redBright("skill 2 projects completed cant be blank")
                    print(error)
                    return
                }

                if (projectsCompleted > 0 === false) {
                    error = chalk.redBright(" 😒 invalid number of projects completed. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill3",
            message: "Skill 3 eg (Database Administrator, ...): ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("skill name cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 100) {
                    inp = ""
                    error = chalk.redBright(" 😒 skill name length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill3_desc",
            message: "Skill 3 brief description: ",
            validate: (inp) => {
                let error;
                if (inp === "") {
                    error = chalk.redBright("skill 3 description cant be blank")
                    print(error)
                    return
                }
                if (inp.length > 300) {
                    inp = ""
                    error = chalk.redBright(" 😒 skill 3 description length is too long. ")
                    print(error)
                    return
                }
                return true
            }
        },
        {
            type: "input",
            name: "skill3_project_completed",
            message: "Skill 3 projects completed (eg 20, 10,5): ",
            validate: (inp) => {
                let error;
                let projectsCompleted = parseInt(inp)
                if (inp === "") {
                    error = chalk.redBright("skill 3 projects completed cant be blank")
                    print(error)
                    return
                }

                if (projectsCompleted > 0 === false) {
                    error = chalk.redBright(" 😒 invalid number of projects completed. ")
                    print(error)
                    return
                }
                return true
            }
        },
    ]

    const answers = await inquire.prompt(questions)
    const usersSkills = [
        {
            name: answers.skill1,
            description: answers.skill1_desc,
            projects_completed: answers.skill1_project_completed,
        },
        {
            name: answers.skill2,
            description: answers.skill2_desc,
            projects_completed: answers.skill2_project_completed,
        },
        {
            name: answers.skill3,
            description: answers.skill3_desc,
            projects_completed: answers.skill3_project_completed,
        }
    ]

    // save users data

    print(usersSkills)
    print("")

    // start spinner
    spinner.start({text: "Saving Skill"})
    await wait(1)
    // stop spinner
    spinner.success({text: "Skills information saved"})

    return true
}


module.exports = {
    askUserInfo,
    askForUserSkills
}