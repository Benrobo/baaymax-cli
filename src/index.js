#!/usr/bin/env node

const inquire = require("inquirer")
const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const figlet = require("figlet")
const {print, wait} = require("./utils/index.js")
const gradient = require("gradient-string")
const { createSpinner } = require("nanospinner")
const { askForUserSkills, askUserInfo } = require("./questions.js")
const { saveData } = require("./utils/saveData.js")

let title = figlet.textSync("BaayMax", { font: "Big Money-sw" })



const animation = chalkAnimation.rainbow(title)

const msg1 = gradient("cyan", "green")("Baaymax, A tool which makes generating of portfolio sites much easier.")
const msg2 = gradient("cyan", "green")("init : ( start / initialize baaymax setup )")
const msg3 = gradient("cyan", "green")("--help : ( shows some useful commands )")

async function initBaayMax() {

    // animation.start()
    // await wait(2)
    // animation.stop()
    print("")
    print(msg1)
    print(msg2)
    
    const isUserInfoCollected = await askUserInfo()
    
    if (isUserInfoCollected) {
        const isUserSkillsCollected = await askForUserSkills()
    }
}

// init
initBaayMax()

