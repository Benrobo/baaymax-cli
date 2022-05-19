
const fs = require("fs")
const path = require("path")
const { print } = require(".")
const chalk  = require("chalk")

const cwd = process.cwd()

print(chalk.greenBright(cwd))

function saveData(payload=""){

    // check if the folder baaymax exists where this script is been executed
    const isBaayMaxExists = fs.existsSync("./baaymax")

    print(isBaayMaxExists)
}


module.exports = {
    saveData
}