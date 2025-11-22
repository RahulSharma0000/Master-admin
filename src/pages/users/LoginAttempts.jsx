// src/pages/users/LoginAttempts.jsx

import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMapPin,
  FiMonitor,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

const LoginAttempts = () => {
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load login attempts (Option 2)
  const loadAttempts = async () => {
    setLoading(true);
    const data = await userService.getLoginAttempts();
    setAttempts(
      data.sort((a, b) => new Date(b.time) - new Date(a.time)) // Newest first
    );
    setLoading(false);
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  // ----------------- ADVANCED FILTER + SEARCH -----------------
  const filteredAttempts = useMemo(() => {
    return attempts.filter((a) => {
      const q = search.toLowerCase();
      const statusMatch =
        filter === "All" ||
        (a.status || "").toLowerCase() === filter.toLowerCase();

      const searchMatch =
        (!q ||
          a.username?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.role?.toLowerCase().includes(q) ||
          a.ip?.toLowerCase().includes(q));

      return statusMatch && searchMatch;
    });
  }, [attempts, filter, search]);

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Login Attempts</h1>
          <p className="text-gray-500 text-sm">Track user login validations</p>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by username, email, IP, role..."
          className="bg-gray-50 px-4 py-2 rounded-xl outline-none w-full md:max-w-md shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3">
          {["All", "Success", "Failed"].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-4 py-2 rounded-xl text-sm font-medium shadow 
              ${
                filter === btn
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        {loading ? (
          <p className="text-gray-500 text-center py-6">Loading login attempts...</p>
        ) : filteredAttempts.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No login attempts found.</p>
        ) : (
          <div className="space-y-5">
            {filteredAttempts.map((a) => (
              <div
                key={a.id}
                className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-200"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center 
                      ${
                        a.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {a.status === "Success" ? (
                        <FiCheckCircle className="text-xl" />
                      ) : (
                        <FiXCircle className="text-xl" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                        <FiUser /> {a.fullName || a.username}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {a.email} • {a.role}
                      </p>

                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <FiClock /> {a.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-medium
                    ${
                      a.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                {/* EXTRA LOGIN DETAILS */}
                <div className="mt-4 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <p className="flex items-center gap-2">
                    <FiMonitor /> Browser: <strong>{a.browser || "Unknown"}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMonitor /> OS: <strong>{a.os || "Unknown"}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMonitor /> Device: <strong>{a.device || "Unknown"}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMapPin /> IP: <strong>{a.ip}</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMapPin /> Location:{" "}
                    <strong>{a.location || "Not captured"}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LoginAttempts;
