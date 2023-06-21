import express from "express";
import filesServices from "../services/files.services.js";
import upload from "../config/multer.js";
const filesRouter = express.Router();


filesRouter.post("/", upload.single("myFile"), filesServices._uploadFile)
filesRouter.post("/multiple", upload.array("myFiles", 2), filesServices._uploadMultipleFile)
filesRouter.get("/", filesServices._getAllFiles)
filesRouter.get("/:id", filesServices._getFileById)


export default filesRouter