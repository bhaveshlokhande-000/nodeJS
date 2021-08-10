const routes = require("express").Router()

module.exports = () => {
    routes.use("/user", require("./users")())
    return routes
}