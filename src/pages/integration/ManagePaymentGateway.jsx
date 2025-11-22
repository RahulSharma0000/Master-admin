import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManagePaymentGateway = () => {
  const navigate = useNavigate();

  // --------- STATE ----------

  const [providers, setProviders] = useState([
    {
      id: 1,
      name: "Razorpay",
      environment: "Sandbox",
      status: "Connected",
      lastTested: "2025-11-21 16:20",
      apiKey: "******",
      secretKey: "******",
      webhookUrl: "https://api.yourapp.com/payments/webhook",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    environment: "Sandbox",
    apiKey: "",
    secretKey: "",
    webhookUrl: "",
    status: "Connected",
  });

  const [error, setError] = useState("");

  // --------- HANDLERS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: "",
      environment: "Sandbox",
      apiKey: "",
      secretKey: "",
      webhookUrl: "",
      status: "Connected",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (provider) => {
    setIsEditMode(true);
    setEditingId(provider.id);
    setFormData({
      name: provider.name,
      environment: provider.environment,
      apiKey: provider.apiKey || "",
      secretKey: provider.secretKey || "",
      webhookUrl: provider.webhookUrl || "",
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
      !formData.name.trim() ||
      !formData.environment.trim() ||
      !formData.apiKey.trim() ||
      !formData.secretKey.trim() ||
      !formData.webhookUrl.trim()
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
      // update existing
      const updated = providers.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: formData.name,
              environment: formData.environment,
              apiKey: formData.apiKey,
              secretKey: formData.secretKey,
              webhookUrl: formData.webhookUrl,
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
        name: formData.name,
        environment: formData.environment,
        apiKey: formData.apiKey,
        secretKey: formData.secretKey,
        webhookUrl: formData.webhookUrl,
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

  // --------- JSX ----------

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
            <h1 className="text-xl font-semibold">Manage Payment Gateway</h1>
            <p className="text-sm text-gray-500">
              Configure payment providers, credentials and webhooks.
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

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Providers Table */}
          <div className="lg:col-span-3 bg-white border border-gray-200 shadow rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Configured Providers
            </h2>

            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 text-gray-500 text-xs">
                <tr>
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Environment</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Last Tested</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {providers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      No providers configured yet. Click &quot;Add Provider&quot; to
                      create one.
                    </td>
                  </tr>
                ) : (
                  providers.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{p.name}</td>
                      <td className="text-gray-600">{p.environment}</td>
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
                <div>
                  <label className="block text-gray-600 mb-1">
                    Provider Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Razorpay / Stripe / PayU..."
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Environment *
                  </label>
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

                <div>
                  <label className="block text-gray-600 mb-1">
                    Secret Key *
                  </label>
                  <input
                    type="password"
                    name="secretKey"
                    value={formData.secretKey}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Webhook URL *
                  </label>
                  <input
                    name="webhookUrl"
                    value={formData.webhookUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://api.yourapp.com/payments/webhook"
                  />
                </div>

                {/* Status (optional) */}
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

export default ManagePaymentGateway;
