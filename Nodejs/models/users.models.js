import { conn } from "../config/db.js";

const findUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * from users", (error, results) => {
            if (error) { reject(error) }
            resolve(results);
        })
    })
}

const findUserByID = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * from users WHERE id=" + id, (error, result) => {
            if (error) { reject(error) }
            resolve(result);
        })
    })
}

const createUser = (user) => {
    return new Promise(async (resolve, reject) => {
        user.created_date = new Date();
        try {
            const query = "INSERT INTO users SET ?";
            const [result] = await conn.promise().query(query, user);
            user.id = result.insertId
            resolve(user);
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (id, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "UPDATE users SET ? WHERE id = ?";
            const [result] = await conn.promise().query(query, [user, id]);
            user.id = id;
            user.affectedRows = result.affectedRows
            resolve(user);
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE from users WHERE id=" + id, (error, result) => {
            if (error) { reject(error) }
            resolve(result);
        })
    })
}

export { findUsers, findUserByID, createUser, updateUser, deleteUser }