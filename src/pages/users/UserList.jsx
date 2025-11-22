// src/pages/users/UserList.jsx

import React, { useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { userService } from "../../services/userService";

const UserList = () => {
  const navigate = useNavigate();
  const { users, loading, reload } = useUsers();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ---------------------------------------------------------
  // FILTERED USERS
  // ---------------------------------------------------------
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();

      const matchesSearch =
        !q ||
        u.fullName?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q);

      const matchesRole =
        roleFilter === "ALL" ||
        (u.role || "").toLowerCase() === roleFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "ALL" ||
        (u.status || "").toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // ---------------------------------------------------------
  // ACTIONS
  // ---------------------------------------------------------
  const handleToggleStatus = async (id) => {
    await userService.toggleUserStatus(id); // FIXED
    reload();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await userService.deleteUser(id); // FIXED
    reload();
  };

  return (
    <MainLayout>
      {/* ------------------ HEADER ------------------ */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm transition"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">User List</h1>
            <p className="text-gray-500 text-sm">
              View and manage all registered users in the system.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/users/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm"
        >
          + Add New User
        </button>
      </div>

      {/* ------------------ FILTER BAR ------------------ */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:max-w-md">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, username or phone..."
            className="flex-1 bg-gray-50 rounded-xl px-3 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 text-sm outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Branch Manager">Branch Manager</option>
            <option value="Loan Officer">Loan Officer</option>
            <option value="Field Staff">Field Staff</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 text-sm outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* ------------------ CONTENT LIST ------------------ */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        {loading ? (
          <p className="text-gray-500 text-center py-8 text-sm">
            Loading users...
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm">
            No users found. Try changing filters or add a new user.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                {/* LEFT: Info */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {user.fullName || "Unnamed User"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {user.username && <span>{user.username} • </span>}
                    {user.email}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {user.role || "Role not set"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {user.organizationName
                      ? `${user.organizationName} → ${
                          user.branchName || "-"
                        } → ${user.departmentName || "-"}`
                      : "No org/branch/department linked"}
                  </p>
                </div>

                {/* RIGHT: Actions */}
                <div className="flex items-center gap-3 justify-between md:justify-end">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    {user.status === "Active" ? (
                      <FiToggleLeft className="text-red-500 text-2xl" />
                    ) : (
                      <FiToggleRight className="text-green-500 text-2xl" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                  >
                    <FiTrash2 className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default UserList;
