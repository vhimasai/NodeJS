import express from "express";
import usersServices from "../services/users.services.js";
import validateUser from "../middlewares/users.validator.js"
const usersRouter = express.Router();

usersRouter.post("/", validateUser.createUser, usersServices._createUser);
usersRouter.post("/login", usersServices._loginUser);
usersRouter.get("/", usersServices._getAllUsers);
usersRouter.get("/:id", usersServices._getUserById);
usersRouter.put("/:id", usersServices._updateUser);
usersRouter.delete("/:id", usersServices._deleteUser);

export default usersRouter