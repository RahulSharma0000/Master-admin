// src/pages/users/ActivateDeactivate.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

const ActivateDeactivate = () => {
  const navigate = useNavigate();

  // ---------------- USERS THROUGH SERVICE (Option 2) ----------------
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const data = await userService.getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ---------------- TOGGLE USER STATUS USING SERVICE ----------------
  const handleToggle = async (id) => {
    await userService.toggleUserStatus(id);
    loadUsers(); // refresh UI
  };

  return (
    <MainLayout>
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Activate / Deactivate Users
          </h1>
          <p className="text-gray-500 text-sm">
            Enable or disable user accounts instantly.
          </p>
        </div>
      </div>

      {/* ---------------- CONTENT CARD ---------------- */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition shadow-sm"
              >
                {/* ---------------- USER INFO ---------------- */}
                <div>
                  <h3 className="text-gray-800 font-semibold text-lg">
                    {user.fullName}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {user.username} • {user.role}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {user.organizationName
                      ? `${user.organizationName} → ${user.branchName} → ${user.departmentName}`
                      : "Not assigned"}
                  </p>
                </div>

                {/* ---------------- STATUS + BUTTON ---------------- */}
                <div className="flex items-center gap-4">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>

                  {/* Toggle Button */}
                  <button
                    onClick={() => handleToggle(user.id)}
                    className={`p-3 rounded-full transition ${
                      user.status === "Active"
                        ? "bg-red-100 hover:bg-red-200"
                        : "bg-green-100 hover:bg-green-200"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <FiToggleLeft className="text-red-600 text-2xl" />
                    ) : (
                      <FiToggleRight className="text-green-600 text-2xl" />
                    )}
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

export default ActivateDeactivate;
