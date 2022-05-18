import fs from "fs"
import inquire from "inquire"
import chalk from "chalk"
import chalkAnimation from "chalk-animation"
import figlet from "figlet"


let title = figlet.textSync("BaayMax", { font: "Big" })


const wait = async (sec = 1) => new Promise((res) => setTimeout(res, sec * 1000))

const animation = chalkAnimation.rainbow(title)

async function initBaayMax() {

    // animation.start()
    // await wait(2)
    // animation.stop()

}

// init
initBaayMax()

