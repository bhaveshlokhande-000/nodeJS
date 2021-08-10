const routes = require("express").Router()
const middleware = require("../../../middleware/testUser")
const upload = require("../../../middleware/testFileUpload")

module.exports = () => {
    routes.get("/", middleware.test_mw, require("./get")())
    routes.get("/user", middleware.test_mw, upload, require("./getCurrentUser")())
    routes.get("/:id", middleware.test_mw, require("./getUser")())
    routes.post("/", upload, require("./post")()) //{"name":"", "email": "", "password": "", "mobile": "", "profilePicture": ""}
    routes.put("/", middleware.test_mw, upload, require("./put")()) //{"name":"", "email": "", "password": "", "mobile": "", "profilePicture": ""}
    routes.post("/login", require("./login")()) // {"email": "","password":""}
    routes.put("/reset", middleware.test_mw, require("./changePassword")()) //{"oldPassword":"old","newPassword":"new"}


    return routes
}