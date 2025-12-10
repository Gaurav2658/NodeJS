const { error } = require("console");
const fs = require("fs")

// sync
fs.writeFileSync("./text.txt", "Hey its for testing");

// async
fs.writeFile("./text.txt", "Hey its for working", (error) => {});

const resultRead = fs.readFileSync("./context.txt", "utf-8");
console.log(resultRead)

fs.readFile("./context.txt", "utf-8", (error, result) => {
    if(error){
        console.log("error thrown");
    }else{
        console.log("Result of context", result);
    }
})

// to add something inside the file
fs.appendFileSync("./text.txt", `${new Date().getDate().toLocaleString()}Hey there \n`);

// to copy the file data to another file
fs.copyFileSync("./text.txt", "./copyText.txt")

// to delete the file
fs.unlinkSync("./copyText.txt")

// to check the statics of the file
const result = fs.statSync("./text.txt")
console.log(result)

// to make the directory of the file 
fs.mkdirSync("My-docs/a/b", {recursive: true})

