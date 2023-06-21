import fs from "fs";

const filePath = "files/test.txt";

fs.unlink(filePath, (error)=>{
    if(error) throw error;
    console.log("File Deleted")
})