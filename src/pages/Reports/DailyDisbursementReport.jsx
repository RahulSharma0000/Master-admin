import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiTrendingUp,
} from "react-icons/fi";
import MainLayout from "../../layout/MainLayout";

const DailyDisbursementReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const handleDownload = (format) => {
    alert(`Downloading Daily Disbursement Report as ${format}`);
  };

  const reportData = [
    { date: "2024-11-20", amount: "₹45,00,000", loans: 12, branch: "Branch A" },
    { date: "2024-11-19", amount: "₹38,50,000", loans: 10, branch: "Branch A" },
    { date: "2024-11-18", amount: "₹52,00,000", loans: 15, branch: "Branch B" },
    { date: "2024-11-17", amount: "₹41,00,000", loans: 11, branch: "Branch C" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">

        {/* TOP BAR */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <FiArrowLeft size={20} className="text-gray-700" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Daily Disbursement Report
            </h1>
            <p className="text-gray-500 text-sm">
              Track daily loan disbursements across all branches
            </p>
          </div>
        </div>

        {/* FILTER CARD */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Filter Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Start Date */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Branches</option>
                <option value="Branch A">Branch A</option>
                <option value="Branch B">Branch B</option>
                <option value="Branch C">Branch C</option>
              </select>
            </div>

          </div>
        </div>

        {/* SUMMARY KPIs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Summary Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-xs text-gray-500 mb-1">Total Disbursed</p>
              <p className="text-2xl font-bold text-blue-700">₹1.76 Cr</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-xs text-gray-500 mb-1">Total Loans</p>
              <p className="text-2xl font-bold text-green-700">48</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-xs text-gray-500 mb-1">Avg. Loan Amount</p>
              <p className="text-2xl font-bold text-purple-700">₹3.67 L</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <p className="text-xs text-gray-500 mb-1">Growth Rate</p>
              <p className="text-2xl font-bold text-orange-700">+12.5%</p>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Recent Disbursements
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Date", "Branch", "Amount", "Loans"].map((th) => (
                    <th
                      key={th}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {reportData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{row.date}</td>
                    <td className="px-6 py-3">{row.branch}</td>
                    <td className="px-6 py-3 font-medium">{row.amount}</td>
                    <td className="px-6 py-3">{row.loans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EXPORT */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Export Report
          </h2>

          <div className="flex flex-wrap gap-4">
            {[
              { type: "PDF", color: "bg-blue-600 hover:bg-blue-700" },
              { type: "Excel", color: "bg-green-600 hover:bg-green-700" },
              { type: "CSV", color: "bg-gray-700 hover:bg-gray-800" },
            ].map(({ type, color }) => (
              <button
                key={type}
                onClick={() => handleDownload(type)}
                className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl transition ${color}`}
              >
                <FiDownload />
                Download as {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DailyDisbursementReport;
