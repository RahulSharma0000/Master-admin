import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManageAccountingErp = () => {
  const navigate = useNavigate();

  // ----------- STATE -----------
  const [systems, setSystems] = useState([
    {
      id: 1,
      erpName: "Zoho Books",
      companyId: "COMP12345",
      apiToken: "********",
      baseUrl: "https://books.zoho.in/api/v3/",
      syncFrequency: "Daily",
      status: "Connected",
      lastSync: "2025-11-21 15:20",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    erpName: "",
    companyId: "",
    apiToken: "",
    baseUrl: "",
    syncFrequency: "Daily",
    status: "Connected",
  });

  const [error, setError] = useState("");

  // ----------- HANDLERS -----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      erpName: "",
      companyId: "",
      apiToken: "",
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
      erpName: item.erpName,
      companyId: item.companyId,
      apiToken: item.apiToken,
      baseUrl: item.baseUrl,
      syncFrequency: item.syncFrequency,
      status: item.status,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setSystems((prev) => prev.filter((x) => x.id !== id));
  };

  const handleSave = () => {
    if (
      !formData.erpName.trim() ||
      !formData.companyId.trim() ||
      !formData.apiToken.trim() ||
      !formData.baseUrl.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const now = new Date();
    const lastSync = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    if (isEditMode && editingId !== null) {
      setSystems((prev) =>
        prev.map((x) =>
          x.id === editingId
            ? {
                ...x,
                ...formData,
                lastSync,
              }
            : x
        )
      );
    } else {
      setSystems((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          lastSync,
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

  // ----------- UI -----------

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F5F7FA] p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          {/* Back Arrow */}
            <button
                 onClick={() => navigate(-1)}
                 className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
               >
                 <FiArrowLeft className="text-gray-700 text-xl" />
               </button>

          <div className="flex-1 ml-3">
            <h1 className="text-xl font-semibold text-gray-800">
              Manage Accounting / ERP System
            </h1>
            <p className="text-sm text-gray-500">
              Connect ERP systems and configure financial data sync.
            </p>
          </div>

          {/* Add ERP Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Add ERP System
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 shadow rounded-xl p-4 mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Connected ERP Systems
          </h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 text-gray-500 text-xs">
              <tr>
                <th className="py-2 text-left">ERP Name</th>
                <th className="py-2 text-left">Company ID</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Last Sync</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {systems.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center text-gray-500"
                  >
                    No ERP system configured yet.
                  </td>
                </tr>
              ) : (
                systems.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{s.erpName}</td>
                    <td>{s.companyId}</td>
                    <td>
                      <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                        {s.status}
                      </span>
                    </td>
                    <td className="text-gray-500">{s.lastSync}</td>
                    <td className="text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(s)}
                        className="mr-3 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
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

        {/* ------------ MODAL ------------ */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5">

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">
                  {isEditMode ? "Edit ERP System" : "Add ERP System"}
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
                <div>
                  <label className="block text-gray-600 mb-1">
                    ERP Name *
                  </label>
                  <select
                    name="erpName"
                    value={formData.erpName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="">Select ERP</option>
                    <option value="Tally">Tally</option>
                    <option value="Zoho Books">Zoho Books</option>
                    <option value="QuickBooks">QuickBooks</option>
                    <option value="SAP">SAP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Company ID *
                  </label>
                  <input
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter Company / Client ID"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    API Token *
                  </label>
                  <input
                    type="password"
                    name="apiToken"
                    value={formData.apiToken}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Base URL *
                  </label>
                  <input
                    name="baseUrl"
                    value={formData.baseUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://api.example.com/"
                  />
                </div>

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
                    <option value="Every 6 Hours">Every 6 Hours</option>
                    <option value="Daily">Daily</option>
                  </select>
                </div>

                {/* Error */}
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

export default ManageAccountingErp;
