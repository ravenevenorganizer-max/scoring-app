const API_URL = "http://localhost:5000/api"; // backend

// 🔑 Ambil token dari localStorage
const getToken = () => localStorage.getItem("token");

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { "Authorization": `Bearer ${getToken()}` }
  });
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE"
  });
  return res.json();
};
