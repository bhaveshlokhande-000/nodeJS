const bcrypt = require("bcrypt")
const userServices = require("../../../services/user")
require("dotenv").config();


module.exports = () => {
    return (req, res) => {
        const accessToken = req.token
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const id = req.user.id
        let success = false;
        let message = ""

        const email = userServices.getUser(id).email
        const loginDetails = {
            email,
            password: oldPassword
        }
        if (oldPassword === newPassword) {
            message = "same user password"
        }
        else {
            if (userServices.validateUser(loginDetails) < 0) {
                message = "invalid user password"
            }
            else {
                const hash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUND));
                userServices.updateUser(id, { password: hash })
                success = true
                message = "password updated"
            }
        }
        res.status(200).json({
            success,
            message,
            accessToken,
        })
    }
}