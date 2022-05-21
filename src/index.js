#!/usr/bin/env node

// _______                                 __       __
// /       \                               /  \     /  |
// $$$$$$$  |  ______    ______   __    __ $$  \   /$$ |  ______   __    __
// $$ |__$$ | /      \  /      \ /  |  /  |$$$  \ /$$$ | /      \ /  \  /  |
// $$    $$<  $$$$$$  | $$$$$$  |$$ |  $$ |$$$$  /$$$$ | $$$$$$  |$$  \/$$/
// $$$$$$$  | /    $$ | /    $$ |$$ |  $$ |$$ $$ $$/$$ | /    $$ | $$  $$<
// $$ |__$$ |/$$$$$$$ |/$$$$$$$ |$$ \__$$ |$$ |$$$/ $$ |/$$$$$$$ | /$$$$  \
// $$    $$/ $$    $$ |$$    $$ |$$    $$ |$$ | $/  $$ |$$    $$ |/$$/ $$  
// $$$$$$$/   $$$$$$$/  $$$$$$$/  $$$$$$$ |$$/      $$/  $$$$$$$/ $$/   $$/
//                               /  \__$$ |
//                               $$    $$/
//                                $$$$$$/

const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const figlet = require("figlet")
const { print, wait } = require("./utils/index.js")
const gradient = require("gradient-string")
const { createSpinner } = require("nanospinner")
const { askForUserSkills, askUserInfo, addOtherImportantData } = require("./questions.js")
const { argv, stderr } = require("process")
const { exec } = require("child_process")
const inquirer = require("inquirer")


const cwd = process.cwd

const BAAYMAX_URL = `https://github.com/Benrobo/baaymax.git`

let title = figlet.textSync(" BaayMax", { font: "Big Money-sw" })

const spinner = createSpinner()

const animation = chalkAnimation.rainbow(title)

const msg1 = gradient("cyan", "green")("Baaymax, A tool which makes generating of portfolio sites much easier.")
const msg2 = gradient("cyan", "green")("--init <project_name | optional> : ( start / initialize baaymax setup )")
const msg3 = gradient("cyan", "green")("--help : ( shows some useful commands )")

const introMsg = `
    ${msg1}

    ${msg2}

    ${msg3}
`

async function initBaayMax() {
    // print(argv)

    const DEFAULT_PROJECT_NAME = "baaymax"

    if (argv.includes("--init")) {
        if (argv.length > 2) {
            animation.start()
            await wait(2)
            animation.stop()

            const projectName = argv.length > 3 ? argv[argv.length - 1] : DEFAULT_PROJECT_NAME
            await startQuestioneer(projectName)
            return print("\n")
        }
    }
    else if (argv.includes("--help")) {
        print(introMsg)
    }
    else if (!argv.includes("--help") || !argv.includes("--init")) {
        animation.start()
        await wait(2)
        animation.stop()
        print("")
        print(introMsg)
    }
}

// init
initBaayMax()

async function startQuestioneer(projectName) {

    // check if git is installed
    exec("git version", (err, stdout, stderr) => {

        if (err) {
            print(chalk.redBright("Something went wrong cloning baaymax. Looks like you dont have git installed."))
            return
        }

        if (stderr) {
            print(chalk.redBright(stderr))
            return
        }

        const parsedOut = stdout.split(" ")

        if (parsedOut.includes("git") || parsedOut.includes("version")) {
            // clone baymax repo
            const command = `git clone ${BAAYMAX_URL} ${projectName} && cd ${projectName} && git remote rm origin`

            spinner.start({ text: "cloning baaymax.." })

            exec(command, async (err, stdout, stderr) => {

                if (err) {
                    spinner.error({ text: chalk.redBright(`Something went wrong cloning baaymax.${err.message}`) })
                    return
                }

                if (stderr) {
                    spinner.start({ text: chalk.cyanBright(stderr) })
                }

                print("\n")
                spinner.success({ text: chalk.cyanBright("baaymax clonned successfully.") })

                await wait(3)

                const isUserInfoCollected = await askUserInfo(projectName)

                if (isUserInfoCollected) {
                    const isUserSkillsCollected = await askForUserSkills(projectName)
                    // if skills info is saved successfully
                    if (isUserSkillsCollected) {

                        const result = addOtherImportantData(projectName)

                        if (result) {
                            await wait(2)
                            await installProjectDependencies(projectName)
                        }
                    }
                }
            })
        }
    })
}

async function installProjectDependencies(projectName) {
    const command = `cd ${projectName} && npm i`
    spinner.start({ text: `installing all '${projectName}' dependencies...` })
    exec(command, async (err, stdout, stderr) => {
        if (err) {
            spinner.error({ text: chalk.redBright(`Something went wrong installing '${projectName}' dependencies. ${err.message}`) })
            return
        }

        if (stderr) {
            spinner.start({ text: chalk.cyanBright(stderr) })
        }

        print("\n")
        spinner.success({ text: chalk.cyanBright(`'${projectName}' dependencies installed successfully.`) })

        // ask user if they would like to open project with vscode
        await openWithVscode(projectName)
        print("\n")
        const treeStructure = `
            All ${chalk.cyanBright("Data")} can be found in:

                👌 ${chalk.greenBright(projectName)} --|
                    --- data /
                        --- ${chalk.cyanBright("skills.json")}
                        --- ${chalk.cyanBright("languages.json")}
                        --- ${chalk.cyanBright("usersInfo.json")}
                        --- ${chalk.cyanBright("projects.json")}
            
            ${chalk.cyanBright("😍😍 Thanks for using baaymax, dont forget to leave a star @ https://github.com/benrobo/baaymax.  ")}
        `

        print(treeStructure)
    })
}

async function openWithVscode(projectName) {

    const command = `cd ${projectName} && code .`
    const question = {
        type: "list",
        name: "choice",
        message: `Would you like to open ${projectName} with vscode ?`,
        choices: ["Yes", "No"]
    }


    const answer = await inquirer.prompt(question)

    if (answer.choice === "Yes") {
        spinner.start({ text: chalk.cyanBright(`Opening ${projectName} with vscode.`) })
        exec(command, async (err, stdout, stderr) => {
            if (err) {
                spinner.error({ text: chalk.redBright(`Something went opening '${projectName}' with vscode. ${err.message}`) })
                return
            }

            if (stderr) {
                spinner.start({ text: chalk.cyanBright(stderr) })
            }

            spinner.success({ text: chalk.cyanBright(`'${projectName}' opened with vscode.`) })
        })
    }
}