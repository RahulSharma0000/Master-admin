import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddApiKeys = () => {
  const navigate = useNavigate();

  // ---------- STATE ----------
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      keyName: "Partner Loan API",
      keyValue: "LIVE_34HJS9XH****",
      environment: "Production",
      allowedDomains: "app.mypartner.com",
      status: "Active",
      createdOn: "2025-11-20 12:20",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    keyName: "",
    keyValue: "",
    environment: "Sandbox",
    allowedDomains: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  // ---------- HANDLERS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      keyName: "",
      keyValue: "",
      environment: "Sandbox",
      allowedDomains: "",
      status: "Active",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setFormData({
      keyName: item.keyName,
      keyValue: item.keyValue,
      environment: item.environment,
      allowedDomains: item.allowedDomains,
      status: item.status,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setApiKeys((prev) => prev.filter((x) => x.id !== id));
  };

  const handleSave = () => {
    if (!formData.keyName.trim() || !formData.keyValue.trim()) {
      setError("Key Name and Key Value are required.");
      return;
    }

    const now = new Date();
    const createdOn = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (isEditMode) {
      setApiKeys((prev) =>
        prev.map((x) =>
          x.id === editingId
            ? { ...x, ...formData, createdOn }
            : x
        )
      );
    } else {
      setApiKeys((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          createdOn,
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // ---------- UI ----------

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F5F7FA] p-5 text-[#1E1E1E]">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          {/* Back arrow only */}
             <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                >
                  <FiArrowLeft className="text-gray-700 text-xl" />
                </button>

          <div className="flex-1 ml-3">
            <h1 className="text-xl font-semibold">Add API Keys</h1>
            <p className="text-sm text-gray-500">
              Generate and manage API keys for external integrations.
            </p>
          </div>

          {/* Add API Key Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Generate New Key
          </button>
        </div>

        {/* API Keys Table */}
        <div className="bg-white border border-gray-200 shadow rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Existing API Keys
          </h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 text-gray-500 text-xs">
              <tr>
                <th className="py-2 text-left">Key Name</th>
                <th className="py-2 text-left">Environment</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Created On</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {apiKeys.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No API Keys created yet.
                  </td>
                </tr>
              ) : (
                apiKeys.map((k) => (
                  <tr key={k.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{k.keyName}</td>
                    <td className="text-gray-600">{k.environment}</td>
                    <td>
                      <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {k.status}
                      </span>
                    </td>
                    <td className="text-gray-500">{k.createdOn}</td>

                    <td className="text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(k)}
                        className="mr-3 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(k.id)}
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
                  {isEditMode ? "Edit API Key" : "Generate API Key"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col gap-3 text-sm">

                {/* Key Name */}
                <div>
                  <label className="block text-gray-600 mb-1">Key Name *</label>
                  <input
                    name="keyName"
                    value={formData.keyName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Loan API, CRM Integration Key..."
                  />
                </div>

                {/* Key Value */}
                <div>
                  <label className="block text-gray-600 mb-1">API Key Value *</label>
                  <input
                    name="keyValue"
                    value={formData.keyValue}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter or paste API Key"
                  />
                </div>

                {/* Environment */}
                <div>
                  <label className="block text-gray-600 mb-1">Environment</label>
                  <select
                    name="environment"
                    value={formData.environment}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="Sandbox">Sandbox</option>
                    <option value="Production">Production</option>
                  </select>
                </div>

                {/* Allowed Domains */}
                <div>
                  <label className="block text-gray-600 mb-1">Allowed Domains</label>
                  <input
                    name="allowedDomains"
                    value={formData.allowedDomains}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., app.company.com"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-gray-600 mb-1">Status</label>
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
                  <p className="text-xs text-red-500">{error}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1E54C7]"
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

export default AddApiKeys;
