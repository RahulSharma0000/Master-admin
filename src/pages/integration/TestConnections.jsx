import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiRefreshCcw, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TestConnections = () => {
  const navigate = useNavigate();

  // -------- INITIAL SAMPLE PROVIDERS ----------
  const [connections, setConnections] = useState([
    {
      id: 1,
      module: "Payment Gateway",
      provider: "Razorpay",
      lastStatus: "Success",
      lastChecked: "2025-11-21 16:20",
      details: "Connection stable. Last test successful.",
    },
    {
      id: 2,
      module: "SMS API",
      provider: "Twilio",
      lastStatus: "Failed",
      lastChecked: "2025-11-21 15:50",
      details: "Invalid API key or expired credential.",
    },
    {
      id: 3,
      module: "Credit Bureau",
      provider: "CIBIL",
      lastStatus: "Success",
      lastChecked: "2025-11-21 11:10",
      details: "Data fetched in 480ms.",
    },
  ]);

  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---------- RUN TEST ----------

  const runTest = (item) => {
    const randomResult = Math.random() > 0.3 ? "Success" : "Failed";

    const now = new Date();
    const time = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const output =
      randomResult === "Success"
        ? `${item.provider} connection successful. Ping OK.`
        : `${item.provider} failed to respond. Check API keys or Base URL.`;

    setConnections((prev) =>
      prev.map((x) =>
        x.id === item.id
          ? {
              ...x,
              lastStatus: randomResult,
              lastChecked: time,
              details: output,
            }
          : x
      )
    );
  };

  const openDetailsModal = (item) => {
    setSelectedTest(item);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

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
            <h1 className="text-xl font-semibold">Test Connections</h1>
            <p className="text-sm text-gray-500">
              Run live health checks for all integrations.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 shadow rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Integration Health Check
          </h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 text-gray-500 text-xs">
              <tr>
                <th className="py-2 text-left">Module</th>
                <th className="py-2 text-left">Provider</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Last Checked</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {connections.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 font-medium">{item.module}</td>
                  <td className="text-gray-700">{item.provider}</td>

                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.lastStatus === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.lastStatus}
                    </span>
                  </td>

                  <td className="text-gray-500">{item.lastChecked}</td>

                  <td className="text-right whitespace-nowrap">

                    {/* Run Test */}
                    <button
                      onClick={() => runTest(item)}
                      className="mr-3 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FiRefreshCcw size={14} /> Run Test
                    </button>

                    {/* Details */}
                    <button
                      onClick={() => openDetailsModal(item)}
                      className="text-gray-700 hover:text-gray-900 flex items-center gap-1"
                    >
                      <FiEye size={14} /> View
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- MODAL (TEST DETAILS) ---------- */}
        {isModalOpen && selectedTest && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-5">

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">
                  Test Result - {selectedTest.provider}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="text-sm">
                <p className="mb-2">
                  <span className="font-semibold">Module:</span>{" "}
                  {selectedTest.module}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Provider:</span>{" "}
                  {selectedTest.provider}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedTest.lastStatus === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedTest.lastStatus}
                  </span>
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Checked On:</span>{" "}
                  {selectedTest.lastChecked}
                </p>

                <p className="mt-3 text-gray-700">
                  <span className="font-semibold">Details:</span>
                  <br />
                  {selectedTest.details}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-md hover:bg-[#1E54C7]"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TestConnections;
