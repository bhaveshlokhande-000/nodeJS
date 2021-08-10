const userServices = require("../../../services/user")

module.exports = () => {
    return (req, res) => {
        const accessToken = req.token
        let userData = req.body
        let success = false;
        let message = ""
        let user = null
        let file = req.file
        if (file) {
            userData = {
                ...userData,
                profilePicture: file.filename,
            }
        }
        if ("email" in userData) {
            success = false
            message = "email field is not allowed"
        }
        else {
            if ("password" in userData) {
                success = false
                message = "password field is not allowed"
            }
            else {
                let id = req.user.id
                user = userServices.updateUser(id, userData)
                success = true
                message = "user updated whose id: " + user.id
            }
        }
        res.status(200).json({
            success,
            message,
            updated_user: user,
            accessToken,
        })
    }
}