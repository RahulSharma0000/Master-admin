import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import MainLayout from "../../layout/MainLayout";

const RevenueReport = () => {
  const [timePeriod, setTimePeriod] = useState("monthly");

  const handleDownload = (format) => {
    alert(`Downloading Revenue Report as ${format}`);
  };

  const revenueBySource = [
    {
      source: "Interest Income",
      amount: "₹18.5 Cr",
      percentage: "62.3%",
      growth: "+8.5%",
    },
    {
      source: "Processing Fees",
      amount: "₹6.2 Cr",
      percentage: "20.9%",
      growth: "+12.3%",
    },
    {
      source: "Late Payment Charges",
      amount: "₹3.1 Cr",
      percentage: "10.4%",
      growth: "+5.2%",
    },
    {
      source: "Prepayment Charges",
      amount: "₹1.9 Cr",
      percentage: "6.4%",
      growth: "+3.8%",
    },
  ];

  const monthlyRevenue = [
    { month: "January", revenue: "₹9.2 Cr", target: "₹9.0 Cr", achievement: "102%" },
    { month: "February", revenue: "₹9.8 Cr", target: "₹9.5 Cr", achievement: "103%" },
    { month: "March", revenue: "₹10.7 Cr", target: "₹10.0 Cr", achievement: "107%" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 pb-6">

        {/* TOP HEADER WITH BACK BUTTON */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <FiArrowLeft size={20} className="text-gray-700" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Revenue Report</h1>
            <p className="text-gray-500 text-sm">
              Comprehensive revenue analysis and financial performance
            </p>
          </div>
        </div>

        {/* TIME PERIOD */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Time Period
          </h2>

          <div className="flex flex-wrap gap-3">
            {["daily", "weekly", "monthly", "quarterly", "yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                  timePeriod === period
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Revenue Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Total Revenue (Q3)</p>
              <p className="text-2xl font-bold text-green-700">₹29.7 Cr</p>
              <p className="text-xs text-green-600 mt-1">↑ 8.5% from Q2</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Monthly Avg Revenue</p>
              <p className="text-2xl font-bold text-blue-700">₹9.9 Cr</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="text-xs text-gray-600 mb-1">Revenue Target</p>
              <p className="text-2xl font-bold text-purple-700">₹28.5 Cr</p>
              <p className="text-xs text-purple-600 mt-1">104% achieved</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <p className="text-xs text-gray-600 mb-1">YoY Growth</p>
              <p className="text-2xl font-bold text-orange-700">+15.2%</p>
            </div>

          </div>
        </div>

        {/* REVENUE BY SOURCE TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Revenue by Source
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Source", "Amount", "% of Total", "Growth"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {revenueBySource.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{row.source}</td>
                  <td className="px-6 py-3 font-semibold">{row.amount}</td>
                  <td className="px-6 py-3">{row.percentage}</td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {row.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TWO CARDS: Loan Type + Top Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Loan Type Revenue */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
              Revenue by Loan Type
            </h3>

            <div className="space-y-4">
              {[
                ["Personal Loans", "₹12.5 Cr (42%)", "42%"],
                ["Home Loans", "₹9.8 Cr (33%)", "33%"],
                ["Business Loans", "₹4.9 Cr (16.5%)", "16.5%"],
                ["Vehicle Loans", "₹2.5 Cr (8.5%)", "8.5%"],
              ].map(([name, label, width], i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{name}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-700 h-2 rounded-full"
                      style={{ width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Branches */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
              Top Performing Branches
            </h3>

            <div className="space-y-3">
              {[
                ["Branch A - Mumbai", "₹8.2 Cr revenue", "110%", "bg-green-50", "text-green-700"],
                ["Branch C - Bangalore", "₹7.5 Cr revenue", "106%", "bg-blue-50", "text-blue-700"],
                ["Branch B - Delhi", "₹7.1 Cr revenue", "102%", "bg-purple-50", "text-purple-700"],
              ].map(([name, short, percent, bg, color], i) => (
                <div key={i} className={`p-3 rounded-lg flex items-center justify-between ${bg}`}>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-600">{short}</p>
                  </div>
                  <span className={`text-xs font-semibold ${color}`}>{percent} target</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MONTHLY TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Monthly Revenue vs Target
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Month", "Revenue", "Target", "Achievement"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyRevenue.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{row.month}</td>
                  <td className="px-6 py-3 font-semibold">{row.revenue}</td>
                  <td className="px-6 py-3">{row.target}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center">
                      <FiTrendingUp className="text-green-600 mr-2" />
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        {row.achievement}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Insights */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4 tracking-wide">
            Financial Insights
          </h3>

          <ul className="space-y-2">
            {[
              "Interest income contributes 62% of total revenue, showing healthy loan portfolio",
              "Processing fees increased by 12.3% indicating strong new loan origination",
              "All branches exceeded targets for Q3, showing excellent performance",
            ].map((text, i) => (
              <li key={i} className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></span>
                <span className="text-sm text-gray-600">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EXPORT */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
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

export default RevenueReport;
