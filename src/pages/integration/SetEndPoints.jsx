import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SetEndpoints = () => {
  const navigate = useNavigate();

  // ---------- STATE ----------

  const [endpoints, setEndpoints] = useState([
    {
      id: 1,
      name: "Loan Application Webhook",
      type: "WEBHOOK",
      authType: "API_KEY",
      baseUrl: "https://api.partner.com",
      path: "/v1/loan/webhook",
      method: "POST",
      status: "Active",
      lastUpdated: "2025-11-21 17:30",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "WEBHOOK",
    authType: "NONE",
    baseUrl: "",
    path: "",
    method: "POST",
    status: "Active",
  });

  const [error, setError] = useState("");

  // ---------- HANDLERS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: "",
      type: "WEBHOOK",
      authType: "NONE",
      baseUrl: "",
      path: "",
      method: "POST",
      status: "Active",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (endpoint) => {
    setIsEditMode(true);
    setEditingId(endpoint.id);
    setFormData({
      name: endpoint.name,
      type: endpoint.type,
      authType: endpoint.authType,
      baseUrl: endpoint.baseUrl,
      path: endpoint.path,
      method: endpoint.method,
      status: endpoint.status,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setEndpoints((prev) => prev.filter((e) => e.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.baseUrl.trim() ||
      !formData.path.trim() ||
      !formData.method.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const now = new Date();
    const lastUpdated = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    if (isEditMode && editingId !== null) {
      setEndpoints((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? {
                ...e,
                ...formData,
                lastUpdated,
              }
            : e
        )
      );
    } else {
      const newEndpoint = {
        id: Date.now(),
        ...formData,
        lastUpdated,
      };
      setEndpoints((prev) => [...prev, newEndpoint]);
    }

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  // ---------- UI ----------

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F5F7FA] p-5 text-[#1E1E1E]">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          {/* Back Arrow Only */}
       <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div className="flex-1 ml-3">
            <h1 className="text-xl font-semibold">Set Endpoints</h1>
            <p className="text-sm text-gray-500">
              Configure base URLs, paths, HTTP methods and authentication for external callbacks and APIs.
            </p>
          </div>

          {/* Add Endpoint */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-md shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Add Endpoint
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 shadow rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Configured Endpoints
          </h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 text-gray-500 text-xs">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Method</th>
                <th className="py-2 text-left">Auth</th>
                <th className="py-2 text-left">URL</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Last Updated</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {endpoints.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-4 text-center text-gray-500 text-sm"
                  >
                    No endpoints configured yet. Click &quot;Add Endpoint&quot; to
                    create one.
                  </td>
                </tr>
              ) : (
                endpoints.map((e) => (
                  <tr key={e.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{e.name}</td>
                    <td className="text-gray-600">{e.type}</td>
                    <td className="text-gray-600">{e.method}</td>
                    <td className="text-gray-600">{e.authType}</td>
                    <td className="text-gray-500">
                      {e.baseUrl}
                      {e.path}
                    </td>
                    <td>
                      <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {e.status}
                      </span>
                    </td>
                    <td className="text-gray-500">
                      {e.lastUpdated || "-"}
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(e)}
                        className="mr-3 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- MODAL ---------- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">
                  {isEditMode ? "Edit Endpoint" : "Add Endpoint"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 text-xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col gap-3 text-sm">
                {/* Name */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Endpoint Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Loan webhook, Disbursement callback"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Endpoint Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="WEBHOOK">Webhook</option>
                    <option value="CALLBACK">Callback</option>
                    <option value="EXTERNAL_API">External API</option>
                  </select>
                </div>

                {/* HTTP Method */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    HTTP Method *
                  </label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>

                {/* Base URL */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Base URL *
                  </label>
                  <input
                    name="baseUrl"
                    value={formData.baseUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://api.partner.com"
                  />
                </div>

                {/* Path */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Path *
                  </label>
                  <input
                    name="path"
                    value={formData.path}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="/v1/loan/webhook"
                  />
                </div>

                {/* Auth Type */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Auth Type
                  </label>
                  <select
                    name="authType"
                    value={formData.authType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="NONE">None</option>
                    <option value="API_KEY">API Key</option>
                    <option value="OAUTH2">OAuth 2.0</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {error && (
                  <p className="text-xs text-red-500 mt-1">{error}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm bg-[#2563EB] text-white rounded-md hover:bg-[#1E54C7]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default SetEndpoints;
