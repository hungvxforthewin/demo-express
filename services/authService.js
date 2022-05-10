const bcrypt = require("bcrypt");
const { uuid } = require("uuidv4");
const AccountModel = require("../models/accountModel");

const saltRounds = 7;

const register = (username, fullname, email, password, phone, role) => {
    return new Promise(async (resolve, reject) => {
        let newRoles = [];
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            return reject(transErrors.account_in_use);
        }
        let salt = bcrypt.genSaltSync(saltRounds);
        let userItem = {
            username: username,
            fullname: fullname,
            phone: phone,
            roles: role === "" ? newRoles : role.split(","),
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid(),
            },
        };
        let user = await UserModel.createNew(userItem);
        return resolve(user);
    });
};

const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        const userByUsername = await UserModel.findByUsername(username);
        if (!userByUsername) {
            return reject({ status: false, mess: "user không tồn tại" });
        }
        if (!userByUsername.local.isActive) {
            return reject({ status: false, mess: "user chưa kích hoạt" });
        }
        const checkPassword = await userByUsername.comparePassword(password);
        // Method compare
        // comparePassword(password) {
        //     return bcrypt.compare(password, this.local.password); // return a promise has result true or false abc@123
        // }
        if (!checkPassword) {
            return reject({ status: false, mess: "password không đúng" });
        }
        return resolve({ status: true, mess: "đăng nhập thành công" });
    });
};

module.exports = {
    register,
    login,
};
