import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    const fileTypes = /png|jpg|jpeg|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
        cb(null, true)
    } else {
        cb("Error: Only png, jpg, jpeg and gif files are allowed..", false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1000 * 1000 },  //1 mb limits
    fileFilter: fileFilter
});

export default upload;