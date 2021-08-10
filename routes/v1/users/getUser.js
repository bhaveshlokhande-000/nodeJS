const userServices = require("../../../services/user")

module.exports = () => {
    return (req, res) => {
        const accessToken = req.token
        const id = req.params.id
        const user = userServices.getUser(id)
        let success = false
        let message = ""

        if (user != null) {
            success = true
            message = user
        }
        else {
            message = "no user found with id: " + id
        }
        res.status(200).json({
            success,
            message,
            accessToken
        })
    }
}