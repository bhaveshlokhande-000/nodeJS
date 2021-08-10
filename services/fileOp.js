const fs = require('fs');
path = require('path')
const filePath = __dirname.replace("\\", path.sep) + path.sep + "users.json"

function writeUsers(users) {
    const data = JSON.stringify(users)
    fs.writeFileSync(filePath, data, 'utf8')
}


function readUsers() {
    const data = fs.readFileSync(filePath)
    const users = JSON.parse(data)
    return users
}

module.exports = {
    writeUsers,
    readUsers
}
