import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManageSmsEmailApi = () => {
  const navigate = useNavigate();

  // ---------- STATE ----------

  const [providers, setProviders] = useState([
    {
      id: 1,
      providerType: "SMS",
      providerName: "Twilio",
      apiKey: "********",
      senderId: "TWILIO_SMS",
      baseUrl: "https://api.twilio.com/v1/send",
      template: "Your OTP is {{otp}}. Do not share it with anyone.",
      status: "Connected",
      lastTested: "2025-11-21 14:50",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    providerType: "",
    providerName: "",
    apiKey: "",
    senderId: "",
    baseUrl: "",
    template: "",
    status: "Connected",
  });

  const [error, setError] = useState("");

  // ---------- HANDLERS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      providerType: "",
      providerName: "",
      apiKey: "",
      senderId: "",
      baseUrl: "",
      template: "",
      status: "Connected",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (provider) => {
    setIsEditMode(true);
    setEditingId(provider.id);
    setFormData({
      providerType: provider.providerType || "",
      providerName: provider.providerName || "",
      apiKey: provider.apiKey || "",
      senderId: provider.senderId || "",
      baseUrl: provider.baseUrl || "",
      template: provider.template || "",
      status: provider.status || "Connected",
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updated = providers.filter((p) => p.id !== id);
    setProviders(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // basic validation
    if (
      !formData.providerType.trim() ||
      !formData.providerName.trim() ||
      !formData.apiKey.trim() ||
      !formData.senderId.trim() ||
      !formData.baseUrl.trim() ||
      !formData.template.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const now = new Date();
    const lastTested = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    if (isEditMode && editingId !== null) {
      // update
      const updated = providers.map((p) =>
        p.id === editingId
          ? {
              ...p,
              providerType: formData.providerType,
              providerName: formData.providerName,
              apiKey: formData.apiKey,
              senderId: formData.senderId,
              baseUrl: formData.baseUrl,
              template: formData.template,
              status: formData.status,
              lastTested,
            }
          : p
      );
      setProviders(updated);
    } else {
      // add new
      const newProvider = {
        id: Date.now(),
        providerType: formData.providerType,
        providerName: formData.providerName,
        apiKey: formData.apiKey,
        senderId: formData.senderId,
        baseUrl: formData.baseUrl,
        template: formData.template,
        status: formData.status,
        lastTested,
      };
      setProviders((prev) => [...prev, newProvider]);
    }

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  // ---------- JSX ----------

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
            <h1 className="text-xl font-semibold">Manage SMS and Email API</h1>
            <p className="text-sm text-gray-500">
              Add and configure SMS + Email providers, templates, and sender details.
            </p>
          </div>

          {/* Add Provider */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-md shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Add Provider
          </button>
        </div>

        {/* Table Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-3 bg-white border border-gray-200 shadow rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Configured Providers
            </h2>

            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 text-gray-500 text-xs">
                <tr>
                  <th className="py-2 text-left">Provider</th>
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-left">Sender ID / From</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Last Tested</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {providers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      No providers configured yet. Click &quot;Add Provider&quot; to
                      create one.
                    </td>
                  </tr>
                ) : (
                  providers.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{p.providerName}</td>
                      <td className="text-gray-600">{p.providerType}</td>
                      <td className="text-gray-600">{p.senderId}</td>
                      <td>
                        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                          {p.status}
                        </span>
                      </td>
                      <td className="text-gray-500">
                        {p.lastTested || "-"}
                      </td>
                      <td className="text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(p)}
                          className="mr-3 text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
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
        </div>

        {/* ---------- MODAL ---------- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">
                  {isEditMode ? "Edit Provider" : "Add Provider"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 text-xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                {/* Provider Type */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Provider Type *
                  </label>
                  <select
                    name="providerType"
                    value={formData.providerType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="SMS">SMS Provider</option>
                    <option value="EMAIL">Email Provider</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>

                {/* Provider Name */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Provider Name *
                  </label>
                  <input
                    name="providerName"
                    value={formData.providerName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Twilio, MSG91, SendGrid"
                  />
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    API Key *
                  </label>
                  <input
                    type="password"
                    name="apiKey"
                    value={formData.apiKey}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter API Key"
                  />
                </div>

                {/* Sender ID / From */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Sender ID / From Email *
                  </label>
                  <input
                    name="senderId"
                    value={formData.senderId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., MSGIND, no-reply@domain.com"
                  />
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
                    placeholder="https://api.twilio.com/v1/send"
                  />
                </div>

                {/* Template */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Template (SMS / Email) *
                  </label>
                  <textarea
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none"
                    placeholder="Enter SMS or Email template here..."
                  />
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
                    <option value="Connected">Connected</option>
                    <option value="Disconnected">Disconnected</option>
                    <option value="Error">Error</option>
                  </select>
                </div>

                {error && (
                  <p className="text-xs text-red-500 mt-1">{error}</p>
                )}

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

export default ManageSmsEmailApi;
