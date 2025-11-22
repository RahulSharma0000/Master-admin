// src/pages/users/AddUser.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";
import { departmentService } from "../../services/departmentService";
import { userService } from "../../services/userService";

const AddUser = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    organization: "",
    branch: "",
    department: "",
    status: "Active",
  });

  // ---------------- LOAD ORGANIZATIONS ----------------
  useEffect(() => {
    (async () => {
      const orgs = await organizationService.getOrganizations();
      setOrganizations(orgs);
    })();
  }, []);

  // ---------------- CHANGE HANDLER ----------------
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Organization change → load branches
    if (name === "organization") {
      const br = await branchService.getBranchesByOrg(value);
      setBranches(br);
      setDepartments([]);
      setForm((prev) => ({ ...prev, branch: "", department: "" }));
    }

    // Branch change → load departments
    if (name === "branch") {
      const dep = await departmentService.getDepartmentsByBranch(value);
      setDepartments(dep);
      setForm((prev) => ({ ...prev, department: "" }));
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const required = [
      "fullName",
      "username",
      "email",
      "phone",
      "password",
      "role",
      "organization",
      "branch",
      "department",
    ];

    for (let f of required) {
      if (!form[f]) {
        alert(`Please fill ${f}`);
        return;
      }
    }

    // Build user object
    const newUser = {
      ...form,
      id: Date.now(),

      // Resolve Names
      organizationName:
        organizations.find((o) => o.id == form.organization)?.name || "",
      branchName:
        branches.find((b) => b.id == form.branch)?.name || "",
      departmentName:
        departments.find((d) => d.id == form.department)?.name || "",
    };

    await userService.addUser(newUser);

    alert("User added successfully!");
    navigate("/users/list");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
          <p className="text-gray-500 text-sm">
            Enter user details and assign role & permissions
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <InputField
            name="fullName"
            label="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <InputField
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
          />

          <InputField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <InputField
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <SelectField
            label="User Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={["Admin", "Branch Manager", "Loan Officer", "Field Staff"]}
          />

          <SelectField
            label="Organization"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            options={organizations.map((o) => ({
              label: o.name,
              value: o.id,
            }))}
          />

          <SelectField
            label="Branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            options={branches.map((b) => ({
              label: b.name,
              value: b.id,
            }))}
          />

          <SelectField
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={departments.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Active", "Inactive"]}
          />

          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md">
              <FiSave /> Add User
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((op, i) => (
        <option key={i} value={op.value || op}>
          {op.label || op}
        </option>
      ))}
    </select>
  </div>
);

export default AddUser;
