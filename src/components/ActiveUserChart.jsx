import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

/* -----------------------------------------
   TIME BASED ACTIVE USER DATASETS
------------------------------------------ */

// Active Users This Week (Daily)
const thisWeekData = [
  { label: "Mon", users: 40 },
  { label: "Tue", users: 55 },
  { label: "Wed", users: 60 },
  { label: "Thu", users: 45 },
  { label: "Fri", users: 70 },
  { label: "Sat", users: 65 },
  { label: "Sun", users: 50 },
];

// Active Users This Month (Weekly)
const thisMonthData = [
  { label: "Week 1", users: 180 },
  { label: "Week 2", users: 220 },
  { label: "Week 3", users: 260 },
  { label: "Week 4", users: 300 },
];

// Last Month (Weekly)
const lastMonthData = [
  { label: "Week 1", users: 150 },
  { label: "Week 2", users: 200 },
  { label: "Week 3", users: 230 },
  { label: "Week 4", users: 260 },
];

// This Year (Monthly)
const thisYearData = [
  { label: "Jan", users: 900 },
  { label: "Feb", users: 1100 },
  { label: "Mar", users: 1200 },
  { label: "Apr", users: 1300 },
  { label: "May", users: 1500 },
  { label: "Jun", users: 1700 },
  { label: "Jul", users: 1600 },
  { label: "Aug", users: 1800 },
  { label: "Sep", users: 1900 },
  { label: "Oct", users: 2100 },
  { label: "Nov", users: 2200 },
  { label: "Dec", users: 2400 },
];

const ActiveUsersChart = () => {
  const [filter, setFilter] = useState("week");

  const getFilteredData = () => {
    switch (filter) {
      case "week":
        return thisWeekData;

      case "month":
        return thisMonthData;

      case "lastMonth":
        return lastMonthData;

      case "year":
        return thisYearData;

      default:
        return thisWeekData;
    }
  };

  // Auto-color logic
  const getColor = (value) => {
    if (value > 1500) return "#22C55E"; // Green
    if (value > 500) return "#3B82F6"; // Blue
    return "#005DA6"; // blue dark
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow ">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Active Users Analytics
        </h2>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getFilteredData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="users" radius={[8, 8, 0, 0]}>
            {getFilteredData().map((entry, index) => (
              <Cell key={index} fill={getColor(entry.users)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersChart;
