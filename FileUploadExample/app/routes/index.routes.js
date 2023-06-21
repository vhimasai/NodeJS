import express from "express";
import filesRouter from "./files.routes.js";
import filesFolderRouter from "./filesFolder.routes.js";
const routes = express();

routes.use("/files", filesRouter);
routes.use("/filesFolder", filesFolderRouter);

export default routes;