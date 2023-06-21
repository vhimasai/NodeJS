import { conn } from "../config/db.js";

const findStudents = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * from students", (error, results) => {
            if (error) { reject(error) }
            resolve(results);
        })
    })
}

const findStudentByID = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * from students WHERE id=" + id, (error, result) => {
            if (error) { reject(error) }
            resolve(result);
        })
    })
}

const createStudent = (student) => {
    return new Promise(async (resolve, reject) => {
        student.created_date = new Date();
        try {
            const query = "INSERT INTO students SET ?";
            const [result] = await conn.promise().query(query, student);
            student.id = result.insertId
            resolve(student);
        } catch (error) {
            reject(error)
        }
    })
}

const updateStudent = (id, student) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = "UPDATE students SET ? WHERE id = ?";
            const [result] = await conn.promise().query(query, [student, id]);
            student.id = id;
            student.affectedRows = result.affectedRows
            resolve(student);
        } catch (error) {
            reject(error)
        }
    })
}

const deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE from students WHERE id=" + id, (error, result) => {
            if (error) { reject(error) }
            resolve(result);
        })
    })
}

export { findStudents, findStudentByID, createStudent, updateStudent, deleteStudent }