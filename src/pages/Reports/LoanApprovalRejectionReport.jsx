import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiPieChart,
} from "react-icons/fi";
import MainLayout from "../../layout/MainLayout";

const LoanApprovalRejectionReport = () => {
  const [dateRange, setDateRange] = useState("this-month");

  const handleDownload = (format) => {
    alert(`Downloading Loan Approval vs Rejection Report as ${format}`);
  };

  const statusData = [
    {
      loanType: "Personal Loan",
      applied: 245,
      approved: 198,
      rejected: 47,
      approvalRate: "80.8%",
    },
    {
      loanType: "Home Loan",
      applied: 189,
      approved: 162,
      rejected: 27,
      approvalRate: "85.7%",
    },
    {
      loanType: "Business Loan",
      applied: 156,
      approved: 118,
      rejected: 38,
      approvalRate: "75.6%",
    },
    {
      loanType: "Vehicle Loan",
      applied: 142,
      approved: 125,
      rejected: 17,
      approvalRate: "88.0%",
    },
  ];

  const rejectionReasons = [
    { reason: "Low Credit Score", count: 45, percentage: "34.9%" },
    { reason: "Insufficient Income", count: 32, percentage: "24.8%" },
    { reason: "High Debt-to-Income Ratio", count: 28, percentage: "21.7%" },
    { reason: "Incomplete Documentation", count: 15, percentage: "11.6%" },
    { reason: "Other Reasons", count: 9, percentage: "7.0%" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 pb-10">

        {/* TOP HEADER */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <FiArrowLeft size={20} className="text-gray-700" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Loan Approval vs Rejection Report
            </h1>
            <p className="text-gray-500 text-sm">
              Analyze loan application outcomes and top rejection reasons
            </p>
          </div>
        </div>

        {/* DATE RANGE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Date Range
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              { value: "this-week", label: "This Week" },
              { value: "this-month", label: "This Month" },
              { value: "last-quarter", label: "Last Quarter" },
              { value: "this-year", label: "This Year" },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                  dateRange === range.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERALL STATS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Overall Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border">
              <p className="text-xs text-gray-500 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-blue-700">732</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex justify-between mb-1">
                <p className="text-xs text-gray-600">Approved</p>
                <FiCheckCircle className="text-green-700" />
              </div>
              <p className="text-2xl font-bold text-green-700">603</p>
              <p className="text-xs text-gray-600 mt-1">82.4%</p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex justify-between mb-1">
                <p className="text-xs text-gray-600">Rejected</p>
                <FiXCircle className="text-red-700" />
              </div>
              <p className="text-2xl font-bold text-red-700">129</p>
              <p className="text-xs text-gray-600 mt-1">17.6%</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border">
              <p className="text-xs text-gray-600 mb-1">Avg. Processing Time</p>
              <p className="text-2xl font-bold text-purple-700">3.2 days</p>
            </div>
          </div>
        </div>

        {/* LOAN TYPE TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Loan Type Analysis
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Loan Type",
                    "Applications",
                    "Approved",
                    "Rejected",
                    "Approval Rate",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {statusData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">{row.loanType}</td>
                    <td className="px-6 py-3">{row.applied}</td>
                    <td className="px-6 py-3 flex items-center gap-1">
                      <FiCheckCircle className="text-green-600" />
                      {row.approved}
                    </td>
                    <td className="px-6 py-3 flex items-center gap-1">
                      <FiXCircle className="text-red-600" />
                      {row.rejected}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          parseFloat(row.approvalRate) > 85
                            ? "bg-green-100 text-green-800"
                            : parseFloat(row.approvalRate) > 75
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.approvalRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* REJECTION REASONS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4">
            Top Rejection Reasons
          </h2>

          <div className="space-y-5">
            {rejectionReasons.map((r, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {r.reason}
                  </span>
                  <span className="text-gray-500">
                    {r.count} ({r.percentage})
                  </span>
                </div>

                <div className="bg-gray-200 h-2 rounded-full w-full">
                  <div
                    className="bg-blue-700 h-2 rounded-full"
                    style={{ width: r.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRENDS AND INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4">
              Monthly Trend
            </h3>

            <div className="space-y-3">
              {[
                ["January", "85.2%"],
                ["February", "83.7%"],
                ["March", "82.4%"],
              ].map(([month, rate]) => (
                <div key={month} className="flex justify-between">
                  <span className="text-gray-600 text-sm">{month}</span>
                  <span className="text-sm font-medium">{rate}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4">
              Key Insights
            </h3>

            <ul className="space-y-2">
              {[
                "Vehicle loans have the highest approval rate at 88%",
                "35% of rejections are due to low credit scores",
                "Average processing time improved by 15% this quarter",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-600 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* EXPORT SECTION */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4">
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
                className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl transition hover:opacity-90 ${btn.color}`}
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

export default LoanApprovalRejectionReport;
