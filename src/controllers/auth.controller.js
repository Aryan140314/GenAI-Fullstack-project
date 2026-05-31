const userModel = require("../models/user.model")

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */


async function registerUserController(req,res) {

    const { username, email, password } = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
     }
 }

module.exports = {
    registerUserController
}