const express = require("express");

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Ayush", age: 25 },
  { id: 2, name: "Rahul", age: 23 },
  { id: 3, name: "Aman", age: 24 }
];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to my Express server!");
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// Search users by name
app.get("/search", (req, res) => {
  const name = req.query.name;

  const result = users.filter(user =>
    user.name.toLowerCase().includes((name || "").toLowerCase())
  );

  res.json(result);
});

// Add a new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});