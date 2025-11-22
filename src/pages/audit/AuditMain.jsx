import React from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";

import {
  FiUserCheck,
  FiEdit3,
  FiClock,
  FiGlobe,
  FiDatabase,
} from "react-icons/fi";

// ★ LOS-style Feature Card
const FeatureCard = ({ icon, title, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition"
  >
    <div className="w-14 h-14 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center">
      {React.cloneElement(icon, {
        className: "text-gray-700 text-[22px]",
        strokeWidth: 1.5,
      })}
    </div>

    <h3 className="text-[15px] font-medium text-gray-800">{title}</h3>
  </div>
);

const auditItems = [
  {
    title: "View User Actions",
    icon: <FiUserCheck />,
    link: "/audit/user-actions",
  },
  {
    title: "Track Edits & Deletes",
    icon: <FiEdit3 />,
    link: "/audit/edits-deletes",
  },
  {
    title: "View Timestamps / Activity Timeline",
    icon: <FiClock />,
    link: "/audit/timestamps",
  },
  {
    title: "Track IP Addresses",
    icon: <FiGlobe />,
    link: "/audit/ip-logs",
  },
  {
    title: "Monitor Branch Data Generation",
    icon: <FiDatabase />,
    link: "/audit/branch-data",
  },
];

const AuditMain = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Audit & Compliance System
        </h1>
        <p className="text-gray-500 text-sm">
          View user actions, timestamps, IP logs and audit trails.
        </p>
      </div>

      {/* GRID */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {auditItems.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              onClick={() => navigate(item.link)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AuditMain;
