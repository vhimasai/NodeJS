import { createPool } from "mysql2";
import * as dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const conn = createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

const checkConnection = () => {
    conn.getConnection((error, connection) => {
        if (error) {
            console.log(chalk.red("Error connecting to the Database"));
            return;
        }
        console.log(chalk.green("Connected to Database..."))
        connection.release();
    });
}

export { checkConnection, conn };