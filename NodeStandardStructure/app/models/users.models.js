import { conn } from "../config/db.js";

const findAllUsers = () => {
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

const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "INSERT INTO users SET ?";
            const [result] = await conn.promise().query(query, data);
            data.id = result.insertId
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}


export { findAllUsers, findUserByID, createUser}