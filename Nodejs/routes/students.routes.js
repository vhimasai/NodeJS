import express from "express";
import studentsServices from "../services/students.services.js";
const studentsRouter = express.Router();


studentsRouter.post("/", studentsServices._createStudent)
studentsRouter.get("/", studentsServices._getAllStudents)
studentsRouter.get("/:id", studentsServices._getStudentById)
studentsRouter.put("/:id", studentsServices._updateStudent)
studentsRouter.delete("/:id", studentsServices._deleteStudent)


export default studentsRouter