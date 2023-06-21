
import { findAllFiles, findFileByID, uploadFile } from "../models/files.models.js";
import msg from "../utils/response.js"

const _uploadFile = async (req, res) => {
    console.log("_uploadFile", req.file)
    const obj = { type: req.file.mimetype, name: req.file.originalname, data: req.file.buffer }
    try {
        const file = await uploadFile(obj);
        return msg.successMsg(res, 201, file, "File uploaded successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _uploadMultipleFile = async (req, res) => {
    console.log("_uploadFile", req.files)

    // const obj = { type: req.file.mimetype, name: req.file.originalname, data: req.file.buffer }
    // try {
    //     const file = await uploadFile(obj);
    //     return msg.successMsg(res, 201, file, "File uploaded successfully");
    // } catch (error) {
    //     return msg.errorMsg(res, 503, error);
    // }
}

const _getAllFiles = async (req, res) => {
    console.log("_getAllFiles")
    try {
        const files = await findAllFiles();
        return msg.successMsg(res, 200, files, "Files returned successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

const _getFileById = async (req, res) => {
    console.log("_getFileById")
    try {
        const file = await findFileByID(req.params.id);
        return msg.successMsg(res, 200, file,  "File returned successfully");
    } catch (error) {
        return msg.errorMsg(res, 503, error);
    }
}

export default { _uploadFile,_uploadMultipleFile, _getAllFiles, _getFileById }