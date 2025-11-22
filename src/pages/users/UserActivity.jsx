// src/pages/users/UserActivity.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiActivity, FiClock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

const UserActivity = () => {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- LOAD USER ACTIVITY FROM SERVICE ----------------
  const loadActivities = async () => {
    setLoading(true);
    const data = await userService.getUserActivity();
    setActivities(data);
    setLoading(false);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <MainLayout>

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Activity</h1>
          <p className="text-gray-500 text-sm">Track user actions & events</p>
        </div>
      </div>

      {/* ---------------- ACTIVITY LIST ---------------- */}
      <div className="bg-white p-8 rounded-2xl shadow-md">

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading activity...</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No user activity recorded.</p>
        ) : (
          <div className="space-y-5">

            {activities.map((a) => (
              <div
                key={a.id}
                className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition flex items-center gap-4 shadow-sm"
              >
                {/* Icon Bubble */}
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  <FiActivity className="text-blue-600 text-xl" />
                </div>

                {/* Activity Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{a.action}</h3>

                  {/* Time */}
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FiClock /> {a.time}
                  </p>

                  {/* User */}
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FiUser /> {a.user}
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

export default UserActivity;
