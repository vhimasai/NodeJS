import express from "express";
import usersRouter from "./users.routes.js";
const routes = express();

routes.use("/users", usersRouter);

export default routes;