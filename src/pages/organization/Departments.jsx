// src/pages/tenants/Departments.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { departmentService } from "../../services/departmentService";
import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";

const Departments = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [branches, setBranches] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    staff: 0,
    orgId: "",
    branchId: "",
  });

  // Load Data
  useEffect(() => {
    (async () => {
      setDepartments(await departmentService.getAll());
      setOrganizations(await organizationService.getOrganizations());
      setBranches(await branchService.getBranches());
    })();
  }, []);

  const filteredBranches = form.orgId
    ? branches.filter((b) => b.organizationId == form.orgId)
    : [];

  const reload = async () => {
    setDepartments(await departmentService.getAll());
  };

  // Open Add Modal
  const openAddModal = () => {
    setForm({ id: null, name: "", staff: 0, orgId: "", branchId: "" });
    setEditMode(false);
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (dept) => {
    setForm({
      id: dept.id,
      name: dept.name,
      staff: dept.staff,
      orgId: dept.orgId,
      branchId: dept.branchId,
    });
    setEditMode(true);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "orgId") {
      setForm({
        ...form,
        orgId: value,
        branchId: "",
      });
      return;
    }

    setForm({
      ...form,
      [name]: name === "staff" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Department name required");
    if (!form.orgId) return alert("Select organization");
    if (!form.branchId) return alert("Select branch");

    const payload = {
      name: form.name,
      staff: form.staff,
      orgId: form.orgId,
      branchId: form.branchId,
    };

    if (editMode) {
      await departmentService.update(form.id, payload);
    } else {
      await departmentService.add(payload);
    }

    setModalOpen(false);
    reload();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    await departmentService.remove(id);
    reload();
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
            <p className="text-gray-500 text-sm">
              Link departments with organization & branch
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add Department
        </button>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-xl shadow">
        {departments.length === 0 ? (
          <p className="text-gray-500">No departments found.</p>
        ) : (
          departments.map((d, idx) => (
            <div
              key={d.id}
              className="p-4 bg-gray-50 rounded-xl flex justify-between items-center mb-3"
            >
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-gray-500">
                  Staff: {d.staff} | Org:{" "}
                  {organizations.find((o) => o.id == d.orgId)?.name} → Branch:{" "}
                  {branches.find((b) => b.id == d.branchId)?.name}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(d)}
                  className="p-2 bg-yellow-100 rounded-lg"
                >
                  <FiEdit className="text-yellow-700" />
                </button>

                <button
                  onClick={() => handleDelete(d.id)}
                  className="p-2 bg-red-100 rounded-lg"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-md w-[400px] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <FiX />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Department" : "Add Department"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Org */}
              <div>
                <label className="text-sm font-medium">Organization *</label>
                <select
                  name="orgId"
                  value={form.orgId}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-50 rounded"
                >
                  <option value="">Select organization</option>
                  {organizations.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch */}
              <div>
                <label className="text-sm font-medium">Branch *</label>
                <select
                  name="branchId"
                  value={form.branchId}
                  onChange={handleChange}
                  disabled={!form.orgId}
                  className="w-full p-2 mt-1 bg-gray-50 rounded"
                >
                  <option value="">
                    {form.orgId ? "Select branch" : "Select organization first"}
                  </option>
                  {filteredBranches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-medium">Department Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-50 rounded"
                />
              </div>

              {/* Staff */}
              <div>
                <label className="text-sm font-medium">Staff Count</label>
                <input
                  type="number"
                  name="staff"
                  value={form.staff}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-50 rounded"
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
                {editMode ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Departments;
