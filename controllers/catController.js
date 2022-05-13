const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { config } = require("../middleware/config");
const { generateHashedPassword, generateServerErrorCode, registerValidation, loginValidation } = require("../helpers/utils");
const { SOME_THING_WENT_WRONG, USER_EXISTS_ALREADY, WRONG_PASSWORD, USER_DOES_NOT_EXIST } = require("../config/constant");

function createUser(email, password) {
    const data = {
        email,
        hashedPassword: generateHashedPassword(password),
    };
    return data;
}
const catController = (req, res) => {
    res.json("Hello cat");
};

const getCatController = (req, res) => {
    // User.find({}, (err, result) => {
    //     res.status(200).json({
    //         data: result,
    //     });
    // });
    res.json("Get one cat");
};

// ignore
const registerCatController = async (req, res) => {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
        res.status(400).json({
            code: 400,
            errors: errorsAfterValidation.mapped(),
        });
    } else {
        try {
            const { email, password } = req.body;
            // hash password
            const newUser = createUser(email, password);
            const token = jwt.sign({ email }, config.passport.secret, {
                expiresIn: 10000000,
            });
            const userToReturn = { ...newUser.toJSON(), ...{ token } };
            delete userToReturn.hashedPassword;

            // const user = await User.findOne({ email });
            // if (!user) {
            //     await createUser(email, password);
            //     // Sign token
            //     const newUser = await User.findOne({ email });
            //     const token = jwt.sign({ email }, config.passport.secret, {
            //         expiresIn: 10000000,
            //     });
            //     const userToReturn = { ...newUser.toJSON(), ...{ token } };
            //     delete userToReturn.hashedPassword;
            //     res.status(200).json(userToReturn);
            // } else {
            //     generateServerErrorCode(res, 403, "register email error", USER_EXISTS_ALREADY, "email");
            // }
        } catch (e) {
            generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
        }
    }
};

const loginCatController = async (req, res) => {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
        res.status(400).json({
            code: 400,
            errors: errorsAfterValidation.mapped(),
        });
    } else {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            if (email === "hungvx@gmail.com" && password === "12345678") {
                const oldUser = createUser(email, password);
                const token = jwt.sign({ email }, config.passport.secret, {
                    expiresIn: 1000000,
                });
                // const userToReturn = { ...oldUser.toJSON(), ...{ token } };
                const textJSON = JSON.stringify(oldUser);
                const userToReturn = { ...oldUser, ...{ token } };
                delete userToReturn.hashedPassword;
                res.status(200).json(userToReturn);
            } else {
                generateServerErrorCode(res, 403, "login password error", WRONG_PASSWORD, "password");
            }
            //const user = await User.findOne({ email });
            // if (user && user.email) {
            //     const isPasswordMatched = user.comparePassword(password);
            //     if (isPasswordMatched) {
            //         // Sign token
            //         const token = jwt.sign({ email }, config.passport.secret, {
            //             expiresIn: 1000000,
            //         });
            //         const userToReturn = { ...user.toJSON(), ...{ token } };
            //         delete userToReturn.hashedPassword;
            //         res.status(200).json(userToReturn);
            //     } else {
            //         generateServerErrorCode(res, 403, "login password error", WRONG_PASSWORD, "password");
            //     }
            // } else {
            //     generateServerErrorCode(res, 404, "login email error", USER_DOES_NOT_EXIST, "email");
            // }
        } catch (e) {
            console.log(e);
            generateServerErrorCode(res, 500, e, SOME_THING_WENT_WRONG);
        }
    }
};

module.exports = {
    catController: catController,
    getCatController,
    registerCatController,
    loginCatController,
};
