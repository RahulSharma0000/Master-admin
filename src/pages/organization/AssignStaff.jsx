import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";
import { departmentService } from "../../services/departmentService";
import { staffService } from "../../services/staffService";
import { staffAssignService } from "../../services/staffAssignService";

/* ---------------- Reusable Select ---------------- */
const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm focus:bg-white outline-none"
    >
      <option value="">Select option</option>
      {options.map((op, i) => (
        <option key={i} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  </div>
);

const AssignStaff = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);

  const [assigned, setAssigned] = useState([]);

  const [form, setForm] = useState({
    organization: "",
    branch: "",
    department: "",
    staff: "",
  });

  /* ---------- Load All Base Data ---------- */
  useEffect(() => {
    (async () => {
      setOrganizations(await organizationService.getOrganizations());
      setStaff(await staffService.getAllStaff());
      setAssigned(await staffAssignService.getAll());
    })();
  }, []);

  /* ---------- Handlers ---------- */
  const handleOrgChange = async (e) => {
    const orgId = e.target.value;

    setForm({
      organization: orgId,
      branch: "",
      department: "",
      staff: "",
    });

    const br = await branchService.getBranchesByOrg(orgId);
    setBranches(br);
    setDepartments([]);
  };

  const handleBranchChange = async (e) => {
    const branchId = e.target.value;

    setForm({
      ...form,
      branch: branchId,
      department: "",
    });

    const dep = await departmentService.getDepartmentsByBranch(branchId);
    setDepartments(dep);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.organization || !form.branch || !form.department || !form.staff) {
      alert("All fields are required");
      return;
    }

    const orgName =
      organizations.find((o) => o.id == form.organization)?.name || "";

    const branchName =
      branches.find((b) => b.id == form.branch)?.name || "";

    const deptName =
      departments.find((d) => d.id == form.department)?.name || "";

    const staffName =
      staff.find((s) => s.id == form.staff)?.name || "";

    await staffAssignService.add({
      organizationId: form.organization,
      organization: orgName,
      branchId: form.branch,
      branch: branchName,
      departmentId: form.department,
      department: deptName,
      staffId: form.staff,
      staff: staffName,
    });

    setAssigned(await staffAssignService.getAll());

    setForm({
      organization: "",
      branch: "",
      department: "",
      staff: "",
    });

    setBranches([]);
    setDepartments([]);
  };

  const handleDelete = async (id) => {
    await staffAssignService.remove(id);
    setAssigned(await staffAssignService.getAll());
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
          <h1 className="text-2xl font-bold text-gray-800">Assign Staff</h1>
          <p className="text-gray-500 text-sm">
            Assign staff to branches & departments
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow md:max-w-3xl mb-10">

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

          <SelectField
            label="Organization"
            value={form.organization}
            onChange={handleOrgChange}
            options={organizations.map((o) => ({
              label: o.name,
              value: o.id,
            }))}
          />

          <SelectField
            label="Branch"
            value={form.branch}
            onChange={handleBranchChange}
            options={branches.map((b) => ({
              label: b.name,
              value: b.id,
            }))}
          />

          <SelectField
            label="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            options={departments.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <SelectField
            label="Staff"
            value={form.staff}
            onChange={(e) => setForm({ ...form, staff: e.target.value })}
            options={staff.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
          />

          <button
            type="submit"
            className="mt-4 md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <FiCheckCircle className="text-xl" />
            Assign Staff
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Assigned Staff List
        </h2>

        {assigned.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No staff assigned yet.
          </p>
        ) : (
          <div className="space-y-4">
            {assigned.map((row, idx) => (
              <div
                key={row.id}
                className="p-4 bg-gray-50 rounded-xl flex justify-between items-center hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    #{idx + 1} — {row.staff}
                  </p>
                  <p className="text-gray-500 text-sm">Department: {row.department}</p>
                  <p className="text-gray-500 text-sm">Branch: {row.branch}</p>
                </div>

                <button
                  onClick={() => handleDelete(row.id)}
                  className="p-2 bg-red-100 rounded-full hover:bg-red-200"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default AssignStaff;
