const jwt = require("jsonwebtoken")
const userServices = require("../services/user")
require("dotenv").config()

function test_mw(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) { return res.sendStatus(401) }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err || userServices.getUser(user.id) == -1) { return res.sendStatus(403) }
            else {
                req.user = user
                req.token = token
                next()
            }
        })
    }
}

module.exports = {
    test_mw
}
