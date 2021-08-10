const upload = require("../services/fileUpload")

module.exports = function (req, res, next) {
    upload(req, res, err => {
        if (err)
            res.status(200).json({
                success: false,
                message: err
            })
        else
            next();
    })
}