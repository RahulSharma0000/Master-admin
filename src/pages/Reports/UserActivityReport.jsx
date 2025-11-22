import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiUsers,
  FiActivity,
} from "react-icons/fi";
import MainLayout from "../../layout/MainLayout";

const UserActivityReport = () => {
  const [activityType, setActivityType] = useState("all");

  const handleDownload = (format) => {
    alert(`Downloading User Activity Report as ${format}`);
  };

  const userActivityData = [
    {
      user: "Rajesh Kumar",
      role: "Loan Officer",
      logins: 45,
      applications: 28,
      approvals: 22,
      lastActive: "2 hours ago",
    },
    {
      user: "Priya Sharma",
      role: "Branch Manager",
      logins: 38,
      applications: 15,
      approvals: 35,
      lastActive: "5 hours ago",
    },
    {
      user: "Amit Patel",
      role: "Loan Officer",
      logins: 42,
      applications: 31,
      approvals: 25,
      lastActive: "1 hour ago",
    },
    {
      user: "Sneha Reddy",
      role: "Credit Analyst",
      logins: 40,
      applications: 0,
      approvals: 48,
      lastActive: "30 mins ago",
    },
  ];

  const systemUsageData = [
    { feature: "Loan Applications", usage: 1245, trend: "+12%" },
    { feature: "Document Uploads", usage: 982, trend: "+8%" },
    { feature: "Customer Searches", usage: 756, trend: "+15%" },
    { feature: "Report Generation", usage: 423, trend: "+5%" },
    { feature: "Payment Processing", usage: 678, trend: "+10%" },
  ];

  const peakActivityHours = [
    { time: "09:00 - 11:00", activity: "High", percentage: "28%" },
    { time: "11:00 - 13:00", activity: "Very High", percentage: "35%" },
    { time: "13:00 - 15:00", activity: "Medium", percentage: "18%" },
    { time: "15:00 - 17:00", activity: "High", percentage: "19%" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* ---------- BACK BUTTON + PAGE HEADER ---------- */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              User Activity Report
            </h1>
            <p className="text-gray-500 text-sm">
              Monitor user engagement and system usage patterns
            </p>
          </div>
        </div>

        {/* ---------- FILTERS ---------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Filter Activity
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              { value: "all", label: "All Activities" },
              { value: "logins", label: "Logins" },
              { value: "applications", label: "Applications" },
              { value: "approvals", label: "Approvals" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setActivityType(type.value)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                  activityType === type.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- OVERVIEW CARDS ---------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
            Activity Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">2847</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-1">Avg. Session Time</p>
              <p className="text-2xl font-bold text-gray-900">42 min</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-1">Actions Performed</p>
              <p className="text-2xl font-bold text-gray-900">4084</p>
            </div>
          </div>
        </div>

        {/* ---------- USER ACTIVITY TABLE ---------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              User Activity Details
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "User Name",
                    "Role",
                    "Logins",
                    "Applications",
                    "Approvals",
                    "Last Active",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {userActivityData.map((u, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{u.user}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">{u.logins}</td>
                    <td className="px-6 py-4">{u.applications}</td>
                    <td className="px-6 py-4">{u.approvals}</td>
                    <td className="px-6 py-4 text-gray-600">{u.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- SYSTEM FEATURE USAGE ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left panel */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              System Feature Usage
            </h3>

            <div className="space-y-3">
              {systemUsageData.map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm">
                    <span>{f.feature}</span>
                    <span className="text-gray-600">{f.usage}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-700 h-2 rounded-full"
                      style={{
                        width: `${(f.usage / 1245) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Peak Activity Hours
            </h3>

            <div className="space-y-3">
              {peakActivityHours.map((h, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{h.time}</p>
                    <p className="text-xs text-gray-600">
                      Activity Level: {h.activity}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      h.activity === "Very High"
                        ? "bg-red-100 text-red-800"
                        : h.activity === "High"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {h.percentage}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- EXPORT SECTION ---------- */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
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
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:opacity-90 transition ${btn.color}`}
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

export default UserActivityReport;
