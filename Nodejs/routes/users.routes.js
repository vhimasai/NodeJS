import express from "express";
import usersServices from "../services/users.services.js";
const usersRouter = express.Router();


usersRouter.post("/", usersServices._createUser)
usersRouter.get("/", usersServices._getAllUsers)
usersRouter.get("/:id", usersServices._getUserById)
usersRouter.put("/:id", usersServices._updateUser)
usersRouter.delete("/:id", usersServices._deleteUser)


export default usersRouter