import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManageCreditBureau = () => {
  const navigate = useNavigate();

  // ---------- STATE ----------

  const [bureaus, setBureaus] = useState([
    {
      id: 1,
      bureauName: "CIBIL",
      memberId: "MBR12902",
      status: "Connected",
      lastSync: "2025-11-21 15:20",
      apiUsername: "cibil_user",
      apiPassword: "********",
      endpointUrl: "https://api.cibil.com/v1/report",
      callbackUrl: "https://app.yourdomain.com/callback/cibil",
      requestFormat: "XML",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    bureauName: "",
    memberId: "",
    apiUsername: "",
    apiPassword: "",
    endpointUrl: "",
    callbackUrl: "",
    requestFormat: "XML",
    status: "Connected",
  });

  const [error, setError] = useState("");

  // ---------- HANDLERS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      bureauName: "",
      memberId: "",
      apiUsername: "",
      apiPassword: "",
      endpointUrl: "",
      callbackUrl: "",
      requestFormat: "XML",
      status: "Connected",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (bureau) => {
    setIsEditMode(true);
    setEditingId(bureau.id);
    setFormData({
      bureauName: bureau.bureauName,
      memberId: bureau.memberId,
      apiUsername: bureau.apiUsername || "",
      apiPassword: bureau.apiPassword || "",
      endpointUrl: bureau.endpointUrl || "",
      callbackUrl: bureau.callbackUrl || "",
      requestFormat: bureau.requestFormat || "XML",
      status: bureau.status || "Connected",
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updated = bureaus.filter((b) => b.id !== id);
    setBureaus(updated);
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
      !formData.bureauName.trim() ||
      !formData.memberId.trim() ||
      !formData.apiUsername.trim() ||
      !formData.apiPassword.trim() ||
      !formData.endpointUrl.trim() ||
      !formData.callbackUrl.trim() ||
      !formData.requestFormat.trim()
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
      // update existing bureau
      const updated = bureaus.map((b) =>
        b.id === editingId
          ? {
              ...b,
              bureauName: formData.bureauName,
              memberId: formData.memberId,
              apiUsername: formData.apiUsername,
              apiPassword: formData.apiPassword,
              endpointUrl: formData.endpointUrl,
              callbackUrl: formData.callbackUrl,
              requestFormat: formData.requestFormat,
              status: formData.status,
              lastSync,
            }
          : b
      );
      setBureaus(updated);
    } else {
      // add new bureau
      const newBureau = {
        id: Date.now(),
        bureauName: formData.bureauName,
        memberId: formData.memberId,
        apiUsername: formData.apiUsername,
        apiPassword: formData.apiPassword,
        endpointUrl: formData.endpointUrl,
        callbackUrl: formData.callbackUrl,
        requestFormat: formData.requestFormat,
        status: formData.status,
        lastSync,
      };
      setBureaus((prev) => [...prev, newBureau]);
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
            className="flex items-center text-[#2563EB] hover:text-[#1E54C7] transition"
          >
            <FiArrowLeft size={20} />
          </button>

          <div className="flex-1 ml-3">
            <h1 className="text-xl font-semibold">Manage Credit Bureau</h1>
            <p className="text-sm text-gray-500">
              Add and configure credit bureau integrations such as CIBIL, CRIF, Experian, etc.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 text-sm bg-[#2563EB] text-white px-4 py-2 rounded-md shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Add Bureau
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Bureau List - full width on large */}
          <div className="lg:col-span-3 bg-white border border-gray-200 shadow rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Connected Credit Bureaus
            </h2>

            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 text-gray-500 text-xs">
                <tr>
                  <th className="py-2 text-left">Bureau</th>
                  <th className="py-2 text-left">Member ID</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Last Sync</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bureaus.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      No credit bureaus configured yet. Click &quot;Add Bureau&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  bureaus.map((b) => (
                    <tr key={b.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{b.bureauName}</td>
                      <td className="text-gray-600">{b.memberId}</td>
                      <td>
                        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                          {b.status}
                        </span>
                      </td>
                      <td className="text-gray-500">
                        {b.lastSync || "-"}
                      </td>
                      <td className="text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(b)}
                          className="mr-3 text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          onClick={() => handleDelete(b.id)}
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
                  {isEditMode ? "Edit Credit Bureau" : "Add Credit Bureau"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 text-xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                {/* Bureau Name */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Bureau Name *
                  </label>
                  <select
                    name="bureauName"
                    value={formData.bureauName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="">Select Bureau</option>
                    <option value="CIBIL">CIBIL</option>
                    <option value="CRIF Highmark">CRIF Highmark</option>
                    <option value="Experian">Experian</option>
                    <option value="Equifax">Equifax</option>
                  </select>
                </div>

                {/* Member ID */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Member ID *
                  </label>
                  <input
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter member ID"
                  />
                </div>

                {/* API Username */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    API Username *
                  </label>
                  <input
                    name="apiUsername"
                    value={formData.apiUsername}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                {/* API Password */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    API Password *
                  </label>
                  <input
                    type="password"
                    name="apiPassword"
                    value={formData.apiPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                {/* Endpoint URL */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Endpoint URL *
                  </label>
                  <input
                    name="endpointUrl"
                    value={formData.endpointUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://api.cibil.com/v1/report"
                  />
                </div>

                {/* Callback URL */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Callback URL *
                  </label>
                  <input
                    name="callbackUrl"
                    value={formData.callbackUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://app.yourdomain.com/callback/cibil"
                  />
                </div>

                {/* Request Format */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Request Format *
                  </label>
                  <select
                    name="requestFormat"
                    value={formData.requestFormat}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
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

export default ManageCreditBureau;
