const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ADD user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  res.json(newUser);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});