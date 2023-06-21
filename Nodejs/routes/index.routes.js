import express from "express";
import studentsRouter from "./students.routes.js";
import usersRouter from "./users.routes.js";
const routes = express();

routes.use("/students", studentsRouter);
routes.use("/users", usersRouter);

export default routes;