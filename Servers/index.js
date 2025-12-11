const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express")


// function myHandler(req, res){
//     const log = `${Date.now()} ${req.url} ${req.method}: New data added\n`;
//     if(req.url === "/favicon.ico") return res.end();
//     const myUrl = url.parse(req.url, true)
//     console.log(myUrl);
//     fs.appendFile("log.txt", log, (err, data) => {
//         if(err){
//             console.log("An error is thrown")
//         }else{
//             switch(myUrl.pathname){
//                 case '/': res.end("Home page");
//                 break
//                 case '/about': 
//                 const userName = myUrl.query.myname
//                 res.end(`Hi ${userName}`); 
//                 break
//                 default: res.end("404 Not found")
//                 break
//             }
            
//         }

//     })
//     console.log("new req")
// }

// const myServer = http.createServer(myHandler)
// myServer.listen(8000, () => console.log("Hello Server Started. Let's go"))

const app = express()

app.get("/", (req, res) => {
    return res.send("This is the Home page")
})

app.get("/about", (req, res) => {
    return res.send(`Hellp ${req.query.name}`)
})

app.listen(8000, () => console.log("Server Started check it"))


