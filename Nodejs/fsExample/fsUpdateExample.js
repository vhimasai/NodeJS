import fs from "fs";

const filePath = "files/test.txt";

const newUser = {
    id: 3,
    name: "Ram",
    email: "ram@gmail.com"
}

fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) throw error;

    const users = JSON.parse(data)
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users), (error, data)=>{
        if(error) throw error;
        console.log("File Updated")
    })

})