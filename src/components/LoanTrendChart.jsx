import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* -----------------------------------------
   📌 WEEKLY, MONTHLY, YEARLY DATASETS
------------------------------------------ */

// Weekly Data
const weeklyData = [
  { label: "Mon", active: 20, pending: 10 },
  { label: "Tue", active: 25, pending: 12 },
  { label: "Wed", active: 30, pending: 15 },
  { label: "Thu", active: 40, pending: 18 },
  { label: "Fri", active: 50, pending: 20 },
  { label: "Sat", active: 45, pending: 17 },
  { label: "Sun", active: 35, pending: 15 },
];

// Monthly Data
const monthlyData = [
  { label: "Jan", active: 120, pending: 60 },
  { label: "Feb", active: 150, pending: 70 },
  { label: "Mar", active: 140, pending: 65 },
  { label: "Apr", active: 190, pending: 75 },
  { label: "May", active: 220, pending: 90 },
  { label: "Jun", active: 260, pending: 100 },
];

// Yearly Data
const yearlyData = [
  { label: "2020", active: 300, pending: 150 },
  { label: "2021", active: 450, pending: 180 },
  { label: "2022", active: 520, pending: 200 },
  { label: "2023", active: 610, pending: 250 },
  { label: "2024", active: 700, pending: 290 },
];

const LoanTrendChart = () => {
  const [filter, setFilter] = useState("month");

  const getFilteredData = () => {
    if (filter === "week") return weeklyData;
    if (filter === "year") return yearlyData;
    return monthlyData;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Active vs Pending Loans Trend
        </h2>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getFilteredData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Active Loans */}
          <Line
            type="monotone"
            dataKey="active"
            stroke="#2563EB"
            strokeWidth={3}
            dot={false}
            name="Active Loans"
          />

          {/* Pending Loans */}
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#F59E0B"
            strokeWidth={3}
            dot={false}
            name="Pending Loans"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanTrendChart;
