import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MonitorStatus = () => {
  const navigate = useNavigate();

  // ---------- FAILURE LOGS (CRUD) ----------
  const [logs, setLogs] = useState([
    {
      id: 1,
      service: "SMS API",
      provider: "Twilio",
      timestamp: "2025-11-21 17:10",
      severity: "High",
      message: "API key expired. Authentication failed.",
      details: "Twilio returned HTTP 401 — Invalid API Key.",
    },
    {
      id: 2,
      service: "Credit Bureau",
      provider: "CIBIL",
      timestamp: "2025-11-21 14:40",
      severity: "Medium",
      message: "Delayed response (timeout).",
      details: "Request exceeded timeout limit (8 seconds).",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    service: "",
    provider: "",
    severity: "Low",
    message: "",
    details: "",
  });

  const [error, setError] = useState("");

  // ---------- RECENT ACTIVITY (STATIC) ----------
  const [activities] = useState([
    {
      id: 101,
      description: "Payment webhook delivered successfully.",
      time: "2025-11-21 18:20",
    },
    {
      id: 102,
      description: "SMS template triggered for OTP flow.",
      time: "2025-11-21 18:05",
    },
  ]);

  // ---------- CRUD HANDLERS ----------

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      service: "",
      provider: "",
      severity: "Low",
      message: "",
      details: "",
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (log) => {
    setIsEditMode(true);
    setEditingId(log.id);
    setFormData({
      service: log.service,
      provider: log.provider,
      severity: log.severity,
      message: log.message,
      details: log.details,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
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
      !formData.service.trim() ||
      !formData.provider.trim() ||
      !formData.message.trim()
    ) {
      setError("Service, Provider and Message are required.");
      return;
    }

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(
      2,
      "0"
    )} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    if (isEditMode && editingId !== null) {
      setLogs((prev) =>
        prev.map((l) =>
          l.id === editingId
            ? {
                ...l,
                service: formData.service,
                provider: formData.provider,
                severity: formData.severity,
                message: formData.message,
                details: formData.details,
                timestamp,
              }
            : l
        )
      );
    } else {
      const newLog = {
        id: Date.now(),
        service: formData.service,
        provider: formData.provider,
        severity: formData.severity,
        message: formData.message,
        details: formData.details,
        timestamp,
      };
      setLogs((prev) => [...prev, newLog]);
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
            <h1 className="text-xl font-semibold">Monitor Status</h1>
            <p className="text-sm text-gray-500">
              View failure logs and recent integration activity.
            </p>
          </div>

          {/* Add Log Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm shadow hover:bg-[#1E54C7]"
          >
            <FiPlus size={16} /> Add Log
          </button>
        </div>

        {/* Layout: Logs table + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Failure Logs (CRUD Table) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 shadow rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Failure Logs
            </h2>

            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 text-gray-500 text-xs">
                <tr>
                  <th className="py-2 text-left">Service</th>
                  <th className="py-2 text-left">Provider</th>
                  <th className="py-2 text-left">Severity</th>
                  <th className="py-2 text-left">Message</th>
                  <th className="py-2 text-left">Time</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      No failure logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((l) => (
                    <tr key={l.id} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{l.service}</td>
                      <td className="text-gray-600">{l.provider}</td>
                      <td>
                        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                          {l.severity}
                        </span>
                      </td>
                      <td className="text-gray-700 max-w-xs truncate">
                        {l.message}
                      </td>
                      <td className="text-gray-500 whitespace-nowrap">
                        {l.timestamp}
                      </td>
                      <td className="text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(l)}
                          className="mr-3 text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(l.id)}
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

          {/* Recent Activity (simple list) */}
          <div className="bg-white border border-gray-200 shadow rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Recent Activity
            </h2>

            {activities.length === 0 ? (
              <p className="text-sm text-gray-500">
                No recent activity available.
              </p>
            ) : (
              <ul className="text-sm">
                {activities.map((a) => (
                  <li
                    key={a.id}
                    className="py-2 border-b border-gray-100 flex justify-between"
                  >
                    <span className="text-gray-700">{a.description}</span>
                    <span className="text-gray-500 text-xs">{a.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ---------- MODAL (ADD / EDIT LOG) ---------- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">
                  {isEditMode ? "Edit Failure Log" : "Add Failure Log"}
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
                    Service *
                  </label>
                  <input
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Payment Gateway, SMS API, Credit Bureau..."
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Provider *
                  </label>
                  <input
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Razorpay, Twilio, CIBIL..."
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Severity
                  </label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Message *
                  </label>
                  <input
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Short error summary..."
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Details
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none"
                    placeholder="Technical details, stacktrace, HTTP status, etc."
                  />
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

export default MonitorStatus;
