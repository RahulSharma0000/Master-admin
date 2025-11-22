import { api } from "./api";

const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const authService = {
  
  async login(email, password) {
    const users = getLocal("registeredUsers");

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return null;

    // save session
    localStorage.setItem("token", "dummy_token_123");
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    return foundUser;

    // Later Django:
    // return api.post("/auth/login/", { email, password });
  },

  async recordLoginAttempt({ email, status }) {
    const attempts = getLocal("loginAttempts");
    const newLog = {
      id: Date.now(),
      email,
      status,
      time: new Date().toLocaleString(),
    };

    setLocal("loginAttempts", [newLog, ...attempts]);
  },

  async recordActivity(action, user) {
    const logs = getLocal("userActivity");
    const newLog = {
      id: Date.now(),
      action,
      user,
      time: new Date().toLocaleString(),
    };
    setLocal("userActivity", [newLog, ...logs]);
  },
  async signup(newUser) {
  const users = getLocal("registeredUsers");
  const updated = [...users, newUser];
  setLocal("registeredUsers", updated);

  return newUser;

  // Later Django:
  // return api.post("/auth/signup/", newUser);
}

};
