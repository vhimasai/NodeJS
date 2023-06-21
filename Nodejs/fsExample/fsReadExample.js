import fs from "fs";

const filePath = "files/test.txt";

fs.readFile(filePath, 'utf8', (error, data) => {
    if(error) throw error;
    console.log(JSON.parse(data))
})
