const userServices = require("../../../services/user")

module.exports = () => {
    return (req, res) => {
        const accessToken = req.token
        const id = req.user.id
        const user = userServices.getUser(id)
        res.status(200).json({
            success: true,
            message: user,
            accessToken
        })
    }
}