const userServices = require("../../../services/user")

module.exports = () => {
    return (req, res) => {

        let userData = req.body
        let success = false
        let message = ""
        const file = req.file
        if (file) {
            userData = {
                ...userData,
                profilePicture: file.filename
            }
        }
        const id = userServices.insertUser(userData)
        if (id == -1) {
            message = "already exsists with email: " + userData.email
        }
        else {
            success = true
            message = "user register with id :" + id
        }

        res.status(200).json({
            success,
            message,
        })
    }
}