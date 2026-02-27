import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  const handleAddUser = async () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    await axios.post("http://localhost:5000/users", { name, email });
    setName("");
    setEmail("");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>User Management Dashboard</h2>

      <div className="form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleAddUser}>Add User</button>
      </div>

      <div className="user-list">
        <h3>All Users</h3>

        {users.length === 0 ? (
          <p>No users added</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <button onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;