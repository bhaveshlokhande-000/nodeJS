const userServices = require("../../../services/user")
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = () => {
    return (req, res, next) => {
        const loginData = req.body
        let success = false
        let message = ""
        const id = userServices.validateUser(loginData)
        if (id < 0) {
            if (id == -1) {
                message = "invalid user email"
            }
            else {
                message = "invalid user password"
            }
            res.status(200).json({
                success,
                message,
            })
        }
        else {
            const userId = id;
            const userToken = {
                email: loginData.email,
                id: userId
            }

            const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })

            success = true
            message = "user login successfully with id :" + userId
            res.status(200).json({
                success,
                message,
                accessToken,
            })
        }
    }
}