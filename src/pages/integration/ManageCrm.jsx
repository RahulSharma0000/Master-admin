import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManageCrm = () => {
  const navigate = useNavigate();

  // ---------- STATE ----------
  const [crmList, setCrmList] = useState([
    {
      id: 1,
      crmName: "HubSpot",
      apiKey: "********",
      baseUrl: "https://api.hubapi.com",
      syncFrequency: "Daily",
      status: "Connected",
      lastSync: "2025-11-21 18:00",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    crmName: "",
    apiKey: "",
    baseUrl: "",
    syncFrequency: "Daily",
    status: "Connected",
  });

  const [error, setError] = useState("");

  // ---------- FUNCTIONS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      crmName: "",
      apiKey: "",
      baseUrl: "",
      syncFrequency: "Daily",
      status: "Connected",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setFormData({
      crmName: item.crmName,
      apiKey: item.apiKey,
      baseUrl: item.baseUrl,
      syncFrequency: item.syncFrequency,
      status: item.status,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCrmList((prev) => prev.filter((x) => x.id !== id));
  };

  const handleSave = () => {
    if (!formData.crmName.trim() || !formData.apiKey.trim() || !formData.baseUrl.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    const now = new Date();
    const lastSync = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    if (isEditMode) {
      setCrmList((prev) =>
        prev.map((x) =>
          x.id === editingId
            ? { ...x, ...formData, lastSync }
            : x
        )
      );
    } else {
      setCrmList((prev) => [
        ...prev,
        { id: Date.now(), ...formData, lastSync },
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
      <div className="min-h-screen bg-[#F5F7FA] p-5">

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
            <h1 className="text-xl font-semibold text-gray-800">Manage CRM</h1>
            <p className="text-sm text-gray-500">
              Connect CRM systems like HubSpot, Salesforce, Zoho CRM, etc.
            </p>
          </div>

          {/* Add CRM button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Add CRM
          </button>
        </div>

        {/* CRM Table */}
        <div className="bg-white border border-gray-200 shadow rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Connected CRMs
          </h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 text-gray-500 text-xs">
              <tr>
                <th className="py-2 text-left">CRM Name</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Last Sync</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {crmList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No CRM connected yet.
                  </td>
                </tr>
              ) : (
                crmList.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{c.crmName}</td>
                    <td>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {c.status}
                      </span>
                    </td>
                    <td className="text-gray-500">{c.lastSync}</td>
                    <td className="text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(c)}
                        className="mr-3 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
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
                  {isEditMode ? "Edit CRM" : "Add CRM"}
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

                {/* CRM Name */}
                <div>
                  <label className="block text-gray-600 mb-1">CRM Name *</label>
                  <select
                    name="crmName"
                    value={formData.crmName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="">Select CRM</option>
                    <option value="HubSpot">HubSpot</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="Zoho CRM">Zoho CRM</option>
                    <option value="Freshsales">Freshsales</option>
                  </select>
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-gray-600 mb-1">API Key *</label>
                  <input
                    type="password"
                    name="apiKey"
                    value={formData.apiKey}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                {/* Base URL */}
                <div>
                  <label className="block text-gray-600 mb-1">Base URL *</label>
                  <input
                    name="baseUrl"
                    value={formData.baseUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://api.crm.com/v1/"
                  />
                </div>

                {/* Sync Frequency */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Sync Frequency
                  </label>
                  <select
                    name="syncFrequency"
                    value={formData.syncFrequency}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Every 1 Hour">Every 1 Hour</option>
                    <option value="Daily">Daily</option>
                  </select>
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
                    <option value="Connected">Connected</option>
                    <option value="Disconnected">Disconnected</option>
                    <option value="Error">Error</option>
                  </select>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

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

export default ManageCrm;
