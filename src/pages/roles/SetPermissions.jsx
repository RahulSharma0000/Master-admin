import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { roleService } from "../../services/roleService";

// Same permission list
const PERMISSIONS = [
  { key: "loan_create", label: "Loan Create", desc: "Create new loan applications" },
  { key: "loan_approve", label: "Loan Approve", desc: "Approve / reject loan applications" },
  { key: "loan_edit", label: "Loan Edit", desc: "Edit loan details before disbursement" },
  { key: "view_docs", label: "View Docs", desc: "View uploaded customer documents" },
  { key: "download_docs", label: "Download Docs", desc: "Download customer documents" },
  { key: "edit_policies", label: "Edit Policies", desc: "Modify policy rules for loans" },
  { key: "audit_logs", label: "Audit Logs", desc: "View full audit trail & logs" },
];

const SetPermissions = () => {
  const navigate = useNavigate();
  const roles = roleService.getRoles() || [];

  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({});

  // Load permissions when a role is selected
  const handleRoleChange = (e) => {
    const id = Number(e.target.value);
    setSelectedRole(id);
    const savedPerms = roleService.getPermissions(id);

    // initialize all permissions with false if missing
    const initial = {};
    PERMISSIONS.forEach((p) => (initial[p.key] = false));

    setPermissions({
      ...initial,
      ...(savedPerms || {}),
    });
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }
    roleService.savePermissions(selectedRole, permissions);
    alert("Permissions updated successfully!");
    navigate("/roles");
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Set Role Permissions</h1>
          <p className="text-gray-500 text-sm">
            Modify access levels and control what actions each role can perform.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">
        {/* Select Role */}
        <div className="mb-6">
          <label className="text-gray-700 text-sm font-medium">Select Role</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="mt-2 p-3 rounded-xl bg-gray-50 w-full md:w-80 outline-none shadow-sm"
          >
            <option value="">Choose role</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.roleName}
              </option>
            ))}
          </select>
        </div>

        {/* Permissions Grid */}
        {selectedRole ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERMISSIONS.map((p) => (
                <div
                  key={p.key}
                  className={`border rounded-2xl p-4 flex gap-3 cursor-pointer transition
                    ${
                      permissions[p.key]
                        ? "bg-green-50 border-green-400"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  onClick={() => togglePermission(p.key)}
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={permissions[p.key] || false}
                    onChange={() => togglePermission(p.key)}
                  />

                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {p.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md"
            >
              <FiCheckCircle /> Save Permissions
            </button>
          </div>
        ) : (
          <div className="border border-dashed text-center p-6 rounded-xl text-gray-500">
            Select a role to manage its permissions.
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SetPermissions;
