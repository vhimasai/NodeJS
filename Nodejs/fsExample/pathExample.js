import path from "path";

const filePath = "A:/Surya/NodeJS/NodeJS-example/server.jpg"

const baseName = path.basename(filePath)
console.log("BaseName:", baseName)

const dirName = path.dirname(filePath);
console.log("DirName:", dirName);

const extension = path.extname(filePath);
console.log("Extension:",extension)

const absolutePath = path.join("files","index.html")
console.log("AbsolutePath", absolutePath);