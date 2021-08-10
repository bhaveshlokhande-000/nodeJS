const userServices = require("../../../services/user")

module.exports = () => {
    return (req, res) => {
        const accessToken = req.token
        const users = userServices.getAllUsers()
        res.status(200).json({
            success: true,
            message: users,
            accessToken
        })
    }
}
