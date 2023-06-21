import express from "express";
import filesFolderServices from "../services/filesFolder.services.js";
import upload from "../config/multerFolder.js";
const filesFolderRouter = express.Router();


filesFolderRouter.post("/", upload.single("myFile"), filesFolderServices._uploadFile)
filesFolderRouter.post("/multiple", upload.array("myFiles", 2), filesFolderServices._uploadMultipleFile)


export default filesFolderRouter