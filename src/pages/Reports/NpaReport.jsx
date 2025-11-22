import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiAlertTriangle,
  FiTrendingDown,
} from "react-icons/fi";
import MainLayout from "../../layout/MainLayout";

const NpaReport = () => {
  const [viewType, setViewType] = useState("category");

  const handleDownload = (format) => {
    alert(`Downloading NPA Report as ${format}`);
  };

  const npaByCategory = [
    { category: "Sub-Standard Assets", description: "Overdue 90-180 days", count: 23, amount: "₹1.8 Cr", percentage: "1.2%" },
    { category: "Doubtful Assets", description: "Overdue 180-365 days", count: 15, amount: "₹1.2 Cr", percentage: "0.8%" },
    { category: "Loss Assets", description: "Overdue >365 days", count: 8, amount: "₹0.6 Cr", percentage: "0.4%" },
  ];

  const npaByBranch = [
    { branch: "Branch A - Mumbai", npaCount: 12, npaAmount: "₹0.9 Cr", npaRate: "1.8%" },
    { branch: "Branch B - Delhi", npaCount: 15, npaAmount: "₹1.2 Cr", npaRate: "2.4%" },
    { branch: "Branch C - Bangalore", npaCount: 11, npaAmount: "₹0.8 Cr", npaRate: "1.9%" },
    { branch: "Branch D - Pune", npaCount: 8, npaAmount: "₹0.7 Cr", npaRate: "2.1%" },
  ];

  const recoveryActions = [
    { action: "Legal Notice Issued", count: 18, status: "In Progress" },
    { action: "Recovery Proceedings", count: 12, status: "Active" },
    { action: "Settlement Negotiations", count: 8, status: "Ongoing" },
    { action: "Asset Seizure Initiated", count: 6, status: "Processing" },
    { action: "Written Off", count: 2, status: "Completed" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">

        {/* HEADER */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <FiArrowLeft size={20} className="text-gray-700" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              NPA (Non-Performing Assets) Report
            </h1>
            <p className="text-gray-500 text-sm">
              Track overdue loans, branch-wise NPAs & recovery status
            </p>
          </div>
        </div>

        {/* VIEW FILTER */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            View Mode
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              { value: "category", label: "Category" },
              { value: "branch", label: "Branch" },
              { value: "loan-type", label: "Loan Type" },
            ].map((v) => (
              <button
                key={v.value}
                onClick={() => setViewType(v.value)}
                className={`px-6 py-2 rounded-lg text-sm transition font-medium ${
                  viewType === v.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase">
            NPA Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">NPA Count</p>
              <p className="text-2xl font-bold text-red-700">46</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">Total NPA Amount</p>
              <p className="text-2xl font-bold text-orange-700">₹3.6 Cr</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">NPA Ratio</p>
              <p className="text-2xl font-bold text-yellow-700">2.4%</p>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
              <div className="flex justify-between">
                <p className="text-xs text-gray-600">Recovery Rate</p>
                <FiTrendingDown className="text-green-700" />
              </div>
              <p className="text-2xl font-bold text-green-700">68.5%</p>
            </div>

          </div>
        </div>

        {/* CATEGORY TABLE */}
        {viewType === "category" && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-800 uppercase">NPA by Category</h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Category", "Description", "Count", "Amount", "%"].map((t) => (
                    <th key={t} className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {npaByCategory.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">{row.category}</td>
                    <td className="px-6 py-3">{row.description}</td>
                    <td className="px-6 py-3">{row.count}</td>
                    <td className="px-6 py-3">{row.amount}</td>
                    <td className="px-6 py-3">
                      <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                        {row.percentage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* BRANCH TABLE */}
        {viewType === "branch" && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-800 uppercase">NPA by Branch</h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Branch", "Count", "Amount", "Rate"].map((t) => (
                    <th key={t} className="px-6 py-3 text-left text-xs uppercase text-gray-500">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {npaByBranch.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">{row.branch}</td>
                    <td className="px-6 py-3">{row.npaCount}</td>
                    <td className="px-6 py-3">{row.npaAmount}</td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          parseFloat(row.npaRate) < 2
                            ? "bg-green-100 text-green-700"
                            : parseFloat(row.npaRate) < 3
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.npaRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {/* RECOVERY STATUS */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold uppercase text-gray-800">Recovery Status</h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Action", "Cases", "Status"].map((t) => (
                  <th key={t} className="px-6 py-3 text-left text-xs uppercase text-gray-500">{t}</th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {recoveryActions.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{a.action}</td>
                  <td className="px-6 py-3">{a.count}</td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EXPORT BUTTONS */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4">
            Export Report
          </h2>

          <div className="flex flex-wrap gap-4">
            {[
              { label: "PDF", color: "bg-blue-600" },
              { label: "Excel", color: "bg-green-600" },
              { label: "CSV", color: "bg-gray-700" },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleDownload(btn.label)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white hover:opacity-90 transition ${btn.color}`}
              >
                <FiDownload />
                Download as {btn.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default NpaReport;
