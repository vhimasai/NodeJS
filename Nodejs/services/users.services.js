import { createUser, deleteUser, findUserByID, findUsers, updateUser } from "../models/users.models.js"
import msg from "../utils/response.js"

const _createUser = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        return msg.successMsg(res, 201, user, "User created successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _getAllUsers = async (req, res, next) => {
    try {
        const users = await findUsers();
        return msg.successMsg(res, 200, users, "Users returned successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _getUserById = async (req, res, next) => {
    try {
        const user = await findUserByID(req.params.id);
        return msg.successMsg(res, 200, user,  "User returned successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _updateUser = async (req, res, next) => {
    try {
        const result = await updateUser(req.params.id, req.body)
        return msg.successMsg(res, 200, result, "User updated successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id);
        return msg.successMsg(res, 200, user, "User deleted successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

export default { _createUser, _getAllUsers, _getUserById, _updateUser, _deleteUser }