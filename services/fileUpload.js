const path = require("path")
const multer = require("multer")
const { copyFileSync } = require("fs")

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/
        let typeCheck = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
        let mimeCheck = fileTypes.test(file.mimetype)
        if (typeCheck && mimeCheck) {
            cb(null, true)
        }
        else {
            cb("image only")
        }
    }
}).single("image")


module.exports = upload;