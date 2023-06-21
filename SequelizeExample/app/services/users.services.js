import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import msg from "../utils/response.js"
dotenv.config();
const User = db.users

const _createUser = async (req, res) => {
    try {
        const user = req.body;

        const hashPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashPassword;

        const createdUser = await User.create(user);
        delete createdUser.dataValues.password;

        return msg.successMsg(res, 201, createdUser, "User created successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return msg.errorMsg(res, 401, "Invalid Email or Password");
        }
        delete user.dataValues.password;

        // generate token
        let accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_KEY, { expiresIn: '1d' });
        user.setDataValue("token", accessToken);

        return msg.successMsg(res, 201, user, "User loggedin successfully...")
    } catch (error) {
        return msg.errorMsg(res, 500, error.message || "Something went wrong");
    }
}

const _getAllUsers = async (req, res) => {
    console.log("_getAllUsers")
}

const _getUserById = async (req, res) => {
    console.log("_getUserById")
}

const _updateUser = async (req, res) => {
    console.log("_updateUser")
}

const _deleteUser = async (req, res) => {
    console.log("_deleteUser")
}

export default { _createUser, _loginUser, _getAllUsers, _getUserById, _updateUser, _deleteUser }