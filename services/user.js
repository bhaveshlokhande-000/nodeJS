const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
require("dotenv").config();
const fileOp = require('./fileOp')

let allusers = fileOp.readUsers()

function refreshUsers() {
    allusers = fileOp.readUsers()
}

function getAllUsers() {
    const users = allusers.map(user => {
        return { ...user, profilePicture: `http://localhost:${process.env.PORT}/${user.profilePicture}` }
    })
    return users;
}

function getUser(id) {
    const users = allusers.filter(user => user.id == id);
    return users.length > 0 ? { ...users[0], profilePicture: `http://localhost:${process.env.PORT}/${users[0].profilePicture}` } : null;
}

function insertUser(userData) {
    const email = userData.email
    const users = allusers.filter(user => user.email == email);
    if (users.length > 0) return -1
    const user = userData
    const id = uuidv4();
    const dummy = {
        name: "",
        email: "",
        password: "",
        mobile: "",
        profilePicture: "temp.png"
    }
    const hash = bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUND));
    user.password = hash
    allusers.push({
        ...dummy,
        ...user,
        id: id
    })
    fileOp.writeUsers(allusers)
    return id
}

function updateUser(id, updatedUserData) {
    users = allusers.map(user => {
        if (user.id == id) {
            return {
                ...user,
                ...updatedUserData
            }
        }
        else {
            return user
        }
    })
    fileOp.writeUsers(users)
    refreshUsers()
    const currentUser = getUser(id)
    return currentUser
}

function validateUser(loginDetails) {
    const email = loginDetails.email
    const users = allusers.filter(user => user.email == email)
    if (users.length == 0) return -1
    const user = users[0]
    const hash = user.password
    if (bcrypt.compareSync(loginDetails.password, hash))
        return user.id
    return -2
}

module.exports = {
    getAllUsers,
    getUser,
    insertUser,
    updateUser,
    validateUser,
}