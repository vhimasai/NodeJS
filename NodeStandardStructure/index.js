import * as dotenv from "dotenv";
import express, { json } from "express";
import chalk from "chalk";
import { fileURLToPath } from "url";
import path from "path";
import routes from "./app/routes/index.routes.js";
import { checkConnection } from "./app/config/db.js"

const app = express();
dotenv.config();
checkConnection()

const PORT = process.env.PORT || 3001;

// Middleware
app.use(json())
app.use((req, res, next) => {
    console.log(chalk.green(req.method), chalk.blue(req.url))
    next();
});

app.use("/api/v1/", routes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log("Error", error);
    res.status(500).json({ status: "Internal Server Error", error: error })
})

app.listen(PORT, () => {
    console.log(chalk.blue("Server is running on PORT:") + chalk.red(PORT))
})

export default app
