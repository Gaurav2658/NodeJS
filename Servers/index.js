const http = require("http")
const fs = require("fs")

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} ${req.url}: New data added\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        if(err){
            console.log("An error is thrown")
        }else{
            switch(req.url){
                case '/': res.end("Home page");
                break
                case '/about': res.end("about Page");
                break
                default: res.end("404 Not found")
                break
            }
            
        }

    })
    console.log("new req")
})



myServer.listen(8000, () => console.log("Hello Server Started. Let's go"))
