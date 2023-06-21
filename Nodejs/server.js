import * as dotenv from "dotenv";
import express, { json } from "express";
import { createPool } from "mysql2";
import chalk from "chalk";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(json())
app.use((req, res, next) => {
    console.log(chalk.green(req.method), chalk.blue(req.url))
    next();
});

const pool = createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

pool.getConnection((error, connection) => {
    if (error) {
        console.log(chalk.red("Error connecting to the Database"));
        return;
    }
    console.log(chalk.green("Connected to Database..."))
    connection.release();
});

app.get("/api/v1/students", (req, res, next) => {
    pool.query("SELECT * from students", (error, results) => {
        if (error) { next(error); return; }
        res.status(200).json({ status: "Students returned successfully", students: results })
    })
})

app.get("/api/v1/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    pool.query("SELECT * from students WHERE id=" + studentId, (error, result) => {
        if (error) { next(error); return; }
        res.status(200).json({ status: "Students returned successfully", student: result })
    })
})

app.delete("/api/v1/students/:studentId", (req, res, next) => {
    const { studentId } = req.params;
    pool.query("DELETE from students WHERE id=" + studentId, (error, result) => {
        if (error) { next(error); return; }
        res.status(200).json({ status: "Student deleted successfully", affectedRows: result.affectedRows })
    })
})

app.post("/api/v1/students", async (req, res, next) => {
    const student = req.body
    student.created_date = new Date();
    try {
        const query = "INSERT INTO students SET ?";
        const [result] = await pool.promise().query(query, student);
        student.id = result.insertId
        res.status(201).json({ status: "Students added successfully", student: student })
    } catch (error) {
        next(error);
        return;
    }


    // const query = "INSERT INTO students (name, email, contact) VALUES ('" + student.name + "','" + student.email + "','" + student.contact + "')";
    // console.log(query);
    // pool.query(query, (error, result) => {
    //     if (error) { next(error); return; }
    //     console.log(result)
    //     student.id = result.insertId
    //     res.status(201).json({ status: "Students added successfully", student: student })
    // })

    // pool.query("SELECT * from students", (error, results) => {
    //     if (error) { next(error); return; }
    //     res.status(200).json({ status: "Students returned successfully", students: results })
    // })
})

app.post("/api/v1/students/all", async (req, res, next) => {
    const students = req.body;
    const createdStudents = [];
    try {
        for (var student of students) {
            const query = "INSERT INTO students SET ?";
            const [result] = await pool.promise().query(query, student);
            student.id = result.insertId
            createdStudents.push(student)
        }
        res.status(201).json({ status: "Students added successfully", students: createdStudents })
    } catch (error) {
        next({ error: error, insertedStudent: createdStudents });
        return;
    }
})

app.put("/api/v1/students/:studentId", async (req, res, next) => {
    const { studentId } = req.params;
    const student = req.body;

    try {
        const query = "UPDATE students SET ? WHERE id = ?";
        const [result] = await pool.promise().query(query, [student, studentId]);
        student.id = studentId;
        student.affectedRows = result.affectedRows
        res.status(201).json({ status: "Student updated successfully", student: student })
    } catch (error) {
        next(error);
        return;
    }

})


// Error handling middleware
app.use((error, req, res, next) => {
    console.log("Error", error);
    res.status(500).json({ status: "Internal Server Error", error: error })
})

app.listen(PORT, () => {
    console.log(chalk.blue("Server is running on PORT:") + chalk.red(PORT))
})

export default app

// Table USER: id, name, email, created_date

// CRUD
// C- Create 
// R- Read
// U- Update
// D- Delete