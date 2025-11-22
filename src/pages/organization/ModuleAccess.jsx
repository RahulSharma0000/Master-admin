import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle, FiTrash2, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { moduleAccessService } from "../../services/moduleAccessService";
import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";

// Reusable select
const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm focus:bg-white outline-none"
    >
      <option value="">Select option</option>
      {options.map((op) => (
        <option key={op.value} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  </div>
);

const moduleList = [
  "Loan Management",
  "Branch Management",
  "Staff Management",
  "Module Access Control",
  "Analytics & Reporting",
  "Notifications",
];

const ModuleAccess = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const [checkedModules, setCheckedModules] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    organization: "",
    branch: "",
  });

  // Load organizations + assigned modules
  useEffect(() => {
    (async () => {
      const orgs = await organizationService.getOrganizations();
      setOrganizations(orgs);

      const data = await moduleAccessService.getAll();
      setAssigned(data);
    })();
  }, []);

  // Organization change → load relevant branches
  const handleOrgChange = async (e) => {
    const orgId = e.target.value;
    setForm({ organization: orgId, branch: "" });

    const br = await branchService.getBranchesByOrg(orgId);
    setBranches(br);
  };

  const toggleModule = (mod) => {
    if (checkedModules.includes(mod)) {
      setCheckedModules(checkedModules.filter((m) => m !== mod));
    } else {
      setCheckedModules([...checkedModules, mod]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.organization || !form.branch) {
      alert("Please select organization & branch");
      return;
    }
    if (checkedModules.length === 0) {
      alert("Select at least one module!");
      return;
    }

    const orgName =
      organizations.find((o) => o.id == form.organization)?.name || "";
    const branchName =
      branches.find((b) => b.id == form.branch)?.name || "";

    // EDIT MODE
    if (editingId) {
      await moduleAccessService.update(editingId, {
        modules: checkedModules,
      });
    } else {
      // ADD MODE
      await moduleAccessService.add({
        organizationId: form.organization,
        organization: orgName,
        branchId: form.branch,
        branch: branchName,
        modules: checkedModules,
      });
    }

    const updated = await moduleAccessService.getAll();
    setAssigned(updated);

    // Reset
    setEditingId(null);
    setCheckedModules([]);
    setForm({ organization: "", branch: "" });
    setBranches([]);
  };

  const handleEdit = (row) => {
    setEditingId(row.id);

    setForm({
      organization: row.organizationId,
      branch: row.branchId,
    });

    (async () => {
      const br = await branchService.getBranchesByOrg(row.organizationId);
      setBranches(br);
    })();

    setCheckedModules(row.modules);
  };

  const handleDelete = async (id) => {
    await moduleAccessService.remove(id);
    setAssigned(await moduleAccessService.getAll());
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Module Access</h1>
          <p className="text-gray-500 text-sm">
            Assign modules to branches with simple clean UI
          </p>
        </div>
      </div>

      {/* ASSIGN MODULE FORM */}
      <div className="bg-white p-8 rounded-2xl shadow max-w-3xl mb-10">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <SelectField
            label="Select Organization"
            value={form.organization}
            onChange={handleOrgChange}
            options={organizations.map((o) => ({
              label: o.name,
              value: o.id,
            }))}
          />

          <SelectField
            label="Select Branch"
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
            options={branches.map((b) => ({
              label: b.name,
              value: b.id,
            }))}
          />
        </form>

        {/* MODULE CHECKBOXES */}
        <h3 className="text-gray-700 text-sm font-semibold mt-8 mb-3">
          Select Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleList.map((module, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer 
                ${
                  checkedModules.includes(module)
                    ? "bg-blue-50 border border-blue-300"
                    : "bg-gray-50"
                }`}
            >
              <input
                type="checkbox"
                checked={checkedModules.includes(module)}
                onChange={() => toggleModule(module)}
              />
              <span className="text-gray-800 text-sm">{module}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <FiCheckCircle className="text-xl" />{" "}
          {editingId ? "Update Access" : "Assign Module Access"}
        </button>
      </div>

      {/* ASSIGNED LIST */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Assigned Module Access
        </h2>

        {assigned.length === 0 ? (
          <p className="text-gray-500 text-sm">No module access assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {assigned.map((row, idx) => (
              <div
                key={row.id}
                className="p-4 bg-gray-50 rounded-xl flex justify-between items-center hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    #{idx + 1} — {row.branch}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Organization: {row.organization}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {row.modules.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(row)}
                    className="p-2 bg-yellow-100 rounded-full hover:bg-yellow-200"
                  >
                    <FiEdit className="text-yellow-600" />
                  </button>

                  <button
                    onClick={() => handleDelete(row.id)}
                    className="p-2 bg-red-100 rounded-full hover:bg-red-200"
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

export default ModuleAccess;
