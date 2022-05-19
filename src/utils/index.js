const wait = async (sec = 1) => new Promise((res) => setTimeout(res, sec * 1000))

const print = (msg = "") => console.log(msg)


module.exports = {
    wait,
    print
}