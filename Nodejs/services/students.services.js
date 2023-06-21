import { createStudent, deleteStudent, findStudentByID, findStudents, updateStudent } from "../models/students.models.js"
import msg from "../utils/response.js"

const _createStudent = async (req, res, next) => {
    try {
        const student = await createStudent(req.body);
        return msg.successMsg(res, 201, student, "Student created successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _getAllStudents = async (req, res, next) => {
    try {
        const students = await findStudents();
        return msg.successMsg(res, 200, students, "Students returned successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _getStudentById = async (req, res, next) => {
    try {
        const student = await findStudentByID(req.params.id);
        return msg.successMsg(res, 200, student,  "Student returned successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _updateStudent = async (req, res, next) => {
    try {
        const result = await updateStudent(req.params.id, req.body)
        return msg.successMsg(res, 200, result, "Student updated successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _deleteStudent = async (req, res, next) => {
    try {
        const student = await deleteStudent(req.params.id);
        return msg.successMsg(res, 200, student, "Student deleted successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

export default { _createStudent, _getAllStudents, _getStudentById, _updateStudent, _deleteStudent }