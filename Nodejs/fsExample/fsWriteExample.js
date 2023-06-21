import fs from "fs";

const filePath = "files/test.txt";
const users = [
    {
        id: 1,
        name: "Ravi",
        email: "ravi@gmail.com"
    },    
    {
        id: 2,
        name: "Surya",
        email: "surya@gmail.com"
    }
]

fs.writeFile(filePath, JSON.stringify(users), (error, data)=>{
    if(error) throw error;
    console.log("File Created")
})