const express = require("express")
let users = require("./MOCK_DATA.json")
const app = express();
const fs = require("fs");
const PORT = 8000;

app.listen(PORT, () => console.log("Starting the server"))

// middle ware - plugins  
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log("its for testing");
    next();
})

app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()}: ${req.ip}: ${req.url}`, (error, data) => {
        next();
    })
})

app.get("/users", (req, res) => {
    const html = 
    `<ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")};
    </ul>`
    res.send(html)
})

app.get("/api/users", (req, res) => {
    return res.json(users)
})

//Routes
app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    if(!user) return res.status(400).json({msg: "User not found"})
    return res.json(user)
}).patch((req, res) => {
  const id = Number(req.params.id);
  const {first_name, last_name, email, gender, job_title} = req.body;
  let user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.first_name = first_name || user.first_name;
  user.last_name  = last_name  || user.last_name;
  user.email      = email      || user.email;
  user.gender     = gender     || user.gender;
  user.job_title  = job_title  || user.job_title;
    fs.writeFile("MOCK_DATA.json",JSON.stringify(users, null, 2),(error) => {
      if (error) {
        return res.status(500).send("Failed to save data");
      }
      res.status(200).json({message: `User with ID ${id} updated successfully`,user});
    }
  );
}).delete((req, res) => {
  const  id  = Number(req.params.id);
  console.log("ID of the user", id)
  console.log("ID of the user", users)
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users.filter(user => user.id !== id)), (error, data) => {
    return res.status(200).send(`User with ID ${id} has been deleted.`);
  });
});

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id); 
//     const user = users.find((user) => user.id == id);
//     return res.json(user)
// })


app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (error, data) => {
        return res.json({status: "success", id: users.length})
    })
    // return res.json({status: "pending"})
})
