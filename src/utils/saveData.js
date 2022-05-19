
const fs = require("fs")
const path = require("path")
const { print } = require(".")
const chalk  = require("chalk")

const cwd = process.cwd()

function saveData(payload="", filename="test.json"){

    // check if the folder baaymax exists where this script is been executed
    const isBaayMaxExists = fs.existsSync(`${cwd}/baaymax`)

    const dataFolder = `${cwd}/baaymax/data/`

    // check if the main baaymax folder exists
    if (isBaayMaxExists === false) {
        print("")
        return print(chalk.redBright("Something went wrong, data could not be saved."))
    }

    // check if the4 data folder exists, if not create a new one
    if(fs.existsSync(dataFolder) === false){
        // create new one
        fs.mkdirSync(dataFolder)
    }

    try{
        // create file 
        fs.writeFileSync(`${dataFolder}/${filename}`, `${payload}`)

        return true
    }
    catch (err){
        print(err.message)
    }
}


module.exports = {
    saveData
}