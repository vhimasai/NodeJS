import { conn } from "../config/db.js";

const findAllFiles = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * from files", (error, results) => {
            if (error) { reject(error) }
            resolve(results);
        })
    })
}

const findFileByID = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * from files WHERE id=" + id, (error, result) => {
            if (error) { reject(error) }
            resolve(result);
        })
    })
}

const uploadFile = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "INSERT INTO files SET ?";
            const [result] = await conn.promise().query(query, data);
            data.id = result.insertId
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}


export { findAllFiles, findFileByID, uploadFile}