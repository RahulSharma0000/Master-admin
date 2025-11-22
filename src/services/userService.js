// src/services/userService.js
// --------------------------------------------------------------
// FULL PRODUCTION-READY USER SERVICE (Option 2)
// LocalStorage now → switches to Django API later without UI changes
// --------------------------------------------------------------

import { api } from "./api"; // backend ready (for future)

// ----------------------- LOCAL STORAGE HELPERS -----------------------
const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const USER_KEY = "users";
const LOGIN_ATTEMPT_KEY = "loginAttempts";
const ACTIVITY_KEY = "userActivity";

export const userService = {

  // -------------------------------------------------------------------
  // GET ALL USERS
  // -------------------------------------------------------------------
  async getUsers() {
    return getLocal(USER_KEY);

    // Django Later:
    // const res = await api.get("/users/");
    // return res.data;
  },

  // -------------------------------------------------------------------
  // ADD NEW USER
  // -------------------------------------------------------------------
  async addUser(user) {
    const users = getLocal(USER_KEY);

    const newUser = {
      id: Date.now(),
      status: "Active",
      ...user,
    };

    users.push(newUser);
    setLocal(USER_KEY, users);

    return newUser;

    // Django Later:
    // return api.post("/users/", newUser);
  },

  // -------------------------------------------------------------------
  // UPDATE USER
  // -------------------------------------------------------------------
  async updateUser(id, payload) {
    const users = getLocal(USER_KEY);
    const updated = users.map((u) => (u.id === id ? { ...u, ...payload } : u));

    setLocal(USER_KEY, updated);
    return updated.find((u) => u.id === id);

    // Django Later:
    // return api.put(`/users/${id}/`, payload);
  },

  // -------------------------------------------------------------------
  // TOGGLE USER STATUS (Active/Inactive)
  // -------------------------------------------------------------------
  async toggleUserStatus(id) {
    const users = getLocal(USER_KEY);

    const updated = users.map((u) =>
      u.id === id
        ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
        : u
    );

    setLocal(USER_KEY, updated);
    return true;

    // Django Later:
    // return api.patch(`/users/${id}/toggle-status/`);
  },

  // -------------------------------------------------------------------
  // DELETE USER
  // -------------------------------------------------------------------
  async deleteUser(id) {
    const filtered = getLocal(USER_KEY).filter((u) => u.id !== id);
    setLocal(USER_KEY, filtered);
    return true;

    // Django Later:
    // return api.delete(`/users/${id}/`);
  },

  // -------------------------------------------------------------------
  // LOGIN ATTEMPTS LOG
  // -------------------------------------------------------------------
  async recordLoginAttempt(log) {
    const logs = getLocal(LOGIN_ATTEMPT_KEY);
    const updated = [log, ...logs];
    setLocal(LOGIN_ATTEMPT_KEY, updated);
    return true;

    // Django Later:
    // return api.post("/users/login-attempts/", log);
  },

  async getLoginAttempts() {
    return getLocal(LOGIN_ATTEMPT_KEY);

    // Django Later:
    // return api.get("/users/login-attempts/");
  },

  // -------------------------------------------------------------------
  // USER ACTIVITY LOG
  // -------------------------------------------------------------------
  async recordActivity(log) {
    const logs = getLocal(ACTIVITY_KEY);
    const updated = [log, ...logs];
    setLocal(ACTIVITY_KEY, updated);
    return true;

    // Django Later:
    // return api.post("/users/activity/", log);
  },

  async getUserActivity() {
    return getLocal(ACTIVITY_KEY);

    // Django Later:
    // return api.get("/users/activity/");
  },
};
