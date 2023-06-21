
import msg from "../utils/response.js"

const _uploadFile = async (req, res) => {
    return msg.successMsg(res, 201, req.file, "File uploaded successfully");
}

const _uploadMultipleFile = async (req, res) => {
    return msg.successMsg(res, 201, req.files, "Files uploaded successfully");
}

export default { _uploadFile, _uploadMultipleFile }