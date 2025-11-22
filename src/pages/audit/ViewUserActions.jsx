import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSearch, FiFilter } from "react-icons/fi";

// Dummy API fetch function (replace with backend)
const fetchUserActions = async () => {
  return [
    {
      id: 1,
      user: "Rahul Kumar",
      email: "rahul@example.com",
      action: "User Login",
      status: "Success",
      timestamp: "2025-11-22 • 10:45 AM",
      ip: "192.168.1.44",
    },
    {
      id: 2,
      user: "Amit Sharma",
      email: "amit@example.com",
      action: "Updated Profile",
      status: "Success",
      timestamp: "2025-11-22 • 09:13 AM",
      ip: "192.168.1.22",
    },
    {
      id: 3,
      user: "Riya Mehra",
      email: "riya@example.com",
      action: "Deleted Loan Document",
      status: "Warning",
      timestamp: "2025-11-21 • 04:33 PM",
      ip: "192.168.1.18",
    },
  ];
};

// ★ Action Card (UI match with screenshot)
const ActionCard = ({ item }) => (
  <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-200 hover:shadow-md transition">
    <div className="flex justify-between">
      <div>
        <p className="font-semibold text-gray-900">{item.user}</p>
        <p className="text-gray-500 text-sm">{item.email}</p>

        <p className="text-gray-800 text-sm mt-2">{item.action}</p>

        <p className="text-xs text-gray-500 mt-1">
          {item.timestamp} • IP: {item.ip}
        </p>
      </div>

      {/* Status Button */}
      <div>
        {item.status === "Success" && (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Success
          </span>
        )}
        {item.status === "Warning" && (
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            Warning
          </span>
        )}
      </div>
    </div>
  </div>
);

const ViewUserActions = () => {
  const [actions, setActions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await fetchUserActions();
    setActions(data);
    setFiltered(data);
  };

  // Search Filter
  const applySearch = (value) => {
    setSearch(value);
    setFiltered(
      actions.filter(
        (item) =>
          item.user.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.action.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User Activity Log
          </h1>
          <p className="text-gray-500 text-sm">
            View and track every action performed by users in the system.
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6 flex items-center gap-3">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by user name, action, email..."
          value={search}
          onChange={(e) => applySearch(e.target.value)}
          className="w-full outline-none text-sm"
        />

        <button className="px-4 py-2 bg-gray-50 rounded-xl text-sm flex items-center gap-2 border border-gray-200 hover:bg-gray-100">
          <FiFilter />
          Filters
        </button>
      </div>

      {/* LIST OF ACTIONS */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No actions found.</p>
        ) : (
          filtered.map((item) => <ActionCard key={item.id} item={item} />)
        )}
      </div>
    </MainLayout>
  );
};

export default ViewUserActions;
