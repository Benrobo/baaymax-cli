
const fs = require("fs")
const path = require("path")
const { print } = require(".")
const chalk  = require("chalk")

const cwd = process.cwd()

function saveData(payload="", filename="test.json", projectName){

    let res = {}

    // check if the folder baaymax exists where this script is been executed
    const isBaayMaxExists = fs.existsSync(`${cwd}/${projectName}`)

    const dataFolder = `${cwd}/${projectName}/data/`

    // check if the main baaymax folder exists
    if (isBaayMaxExists === false) {
        res["error"] = true;
        res["msg"] = `Something went wrong, ${chalk.bgRed(projectName)} folder wasnt found.`
        return res
    }

    // check if the4 data folder exists, if not create a new one
    if(fs.existsSync(dataFolder) === false){
        // create new one
        fs.mkdirSync(dataFolder)
    }

    try{
        // create file 
        fs.writeFileSync(`${dataFolder}/${filename}`, `${payload}`)

        res["error"] = false;
        res["msg"] = "Data saved successfully."
        return res
    }
    catch (err){
        res["error"] = true;
        res["msg"] = err.message
        return res
    }
}


module.exports = {
    saveData
}