// src/pages/masterData/MasterData.jsx
import React from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiList,
  FiPercent,
  FiFileText,
  FiBarChart2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ★ Sidebar-style FeatureCard
const FeatureCard = ({ title, icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 
               cursor-pointer hover:shadow-md transition"
  >
    {/* Icon Box */}
    <div className="w-14 h-14 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center">
      {React.cloneElement(icon, {
        className: "text-gray-700 text-[22px]",
        strokeWidth: 1.5,
      })}
    </div>

    {/* Title */}
    <h3 className="text-gray-800 text-[15px] font-medium">{title}</h3>
  </div>
);

// ---- ICONS (clean theme — no colors)
const items = [
  {
    title: "Define Loan Product Types",
    icon: <FiList />,
    link: "/master/loan-products",
  },
  {
    title: "Set Interest Settings (ROI, Fees, Penalty)",
    icon: <FiPercent />,
    link: "/master/interest-settings",
  },
  {
    title: "Create Document Templates",
    icon: <FiFileText />,
    link: "/master/document-template",
  },
  {
    title: "Set Credit Scoring Rules",
    icon: <FiBarChart2 />,
    link: "/master/credit-scoring",
  },
];

const MasterData = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Data Configuration</h1>
        <p className="text-gray-500 text-sm">
          Configure loan products, interest settings, templates & scoring rules.
        </p>
      </div>

      {/* Feature Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <FeatureCard
              key={i}
              title={item.title}
              icon={item.icon}
              onClick={() => navigate(item.link)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MasterData;
