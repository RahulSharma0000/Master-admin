// src/pages/users/AssignUser.jsx

import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { userService } from "../../services/userService";
import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";
import { departmentService } from "../../services/departmentService";

const AssignUser = () => {
  const navigate = useNavigate();

  // ---------------- DATA ----------------
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  // ---------------- FORM STATE ----------------
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // ---------------- LOAD USERS + ORGANIZATIONS ----------------
  useEffect(() => {
    (async () => {
      const usr = await userService.getUsers();
      setUsers(usr);

      const org = await organizationService.getOrganizations();
      setOrganizations(org);
    })();
  }, []);

  // ---------------- WHEN ORG CHANGES ----------------
  const handleOrgChange = async (e) => {
    const orgId = e.target.value;
    setSelectedOrg(orgId);

    const br = await branchService.getBranchesByOrg(orgId);
    setBranches(br);
    setSelectedBranch("");

    setDepartments([]);
    setSelectedDepartment("");
  };

  // ---------------- WHEN BRANCH CHANGES ----------------
  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);

    const dep = await departmentService.getDepartmentsByBranch(branchId);
    setDepartments(dep);
    setSelectedDepartment("");
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) return alert("Please select a user.");
    if (!selectedOrg || !selectedBranch || !selectedDepartment)
      return alert("Please fill all fields");

    const updatedUsers = users.map((u) =>
      u.id == selectedUser
        ? {
            ...u,
            organization: selectedOrg,
            organizationName:
              organizations.find((o) => o.id == selectedOrg)?.name,

            branch: selectedBranch,
            branchName: branches.find((b) => b.id == selectedBranch)?.name,

            department: selectedDepartment,
            departmentName:
              departments.find((d) => d.id == selectedDepartment)?.name,
          }
        : u
    );

    // Save to storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update UI
    setUsers(updatedUsers);

    alert("User assigned successfully!");
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
          <h1 className="text-2xl font-bold text-gray-800">Assign User</h1>
          <p className="text-gray-500 text-sm">
            Assign user to organization, branch & department
          </p>
        </div>
      </div>

      {/* ---------------- FORM ---------------- */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Select User */}
          <SelectField
            label="Select User"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            options={users.map((u) => ({
              label: `${u.fullName} (${u.username})`,
              value: u.id,
            }))}
          />

          {/* Organization */}
          <SelectField
            label="Organization"
            value={selectedOrg}
            onChange={handleOrgChange}
            options={organizations.map((o) => ({
              label: o.name,
              value: o.id,
            }))}
          />

          {/* Branch */}
          <SelectField
            label="Branch"
            value={selectedBranch}
            onChange={handleBranchChange}
            options={branches.map((b) => ({
              label: b.name,
              value: b.id,
            }))}
          />

          {/* Department */}
          <SelectField
            label="Department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            options={departments.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiCheckCircle className="text-xl" /> Assign User
            </button>
          </div>
        </form>
      </div>

      {/* ---------------- ASSIGNED USERS LIST ---------------- */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Assigned Users
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-500">No users available.</p>
        ) : (
          <div className="space-y-4">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-gray-800 text-lg">
                  {u.fullName}
                </h3>
                <p className="text-sm text-gray-500">{u.role}</p>

                <p className="text-xs text-gray-600 mt-1">
                  {u.organizationName ? (
                    <>
                      <strong>{u.organizationName}</strong> →{" "}
                      <strong>{u.branchName}</strong> →{" "}
                      <strong>{u.departmentName}</strong>
                    </>
                  ) : (
                    "Not assigned yet"
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// ---------------- Reusable Select ----------------
const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((op, i) => (
        <option key={i} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  </div>
);

export default AssignUser;
