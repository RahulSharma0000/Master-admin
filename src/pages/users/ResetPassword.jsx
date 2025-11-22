// src/pages/users/ResetPassword.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiKey, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ---------------- LOAD USERS THROUGH SERVICE (Option 2) ----------------
  useEffect(() => {
    (async () => {
      const data = await userService.getUsers();
      setUsers(data);
    })();
  }, []);

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) return alert("Please select a user.");
    if (!newPassword || !confirmPass)
      return alert("Please enter both password fields.");

    if (newPassword !== confirmPass)
      return alert("Passwords do not match.");

    await userService.updateUser(selectedUser, { password: newPassword });

    alert("Password reset successfully!");
    navigate("/users");
  };

  return (
    <MainLayout>
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reset User Password</h1>
          <p className="text-gray-500 text-sm">
            Choose a user and reset their password securely
          </p>
        </div>
      </div>

      {/* ---------------- FORM CARD ---------------- */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl">
        <form className="space-y-7" onSubmit={handleSubmit}>
          {/* Select User */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">Select User *</label>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.username})
                </option>
              ))}
            </select>
          </div>

          {/* New Password */}
          <PasswordField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            show={showPass}
            toggle={() => setShowPass(!showPass)}
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition"
          >
            <FiKey className="text-lg" /> Reset Password
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

// ---------------- Password Input Reusable Component ----------------
const PasswordField = ({ label, value, onChange, show, toggle }) => (
  <div className="flex flex-col relative">
    <label className="text-gray-700 text-sm font-medium">{label}</label>

    <input
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder="••••••••••"
      className="mt-2 p-3 pr-10 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
    />

    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-[34px] text-gray-500 hover:text-black"
    >
      {show ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>
);

export default ResetPassword;
