import React from "react";
import MainLayout from "../../layout/MainLayout";
import { FiFileText, FiShield, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ★ Sidebar-style FeatureCard (same as all other pages)
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

    {/* Text */}
    <h3 className="text-gray-800 text-[15px] font-medium">{title}</h3>
  </div>
);

// NEW CLEAN ICONS (no colors)
const items = [
  {
    title: "Set Loan Policies (Min/Max, Tenure, EMI, Validation)",
    icon: <FiFileText />,
    link: "/system/policies",
  },
  {
    title: "Set Security Settings (Password, 2FA, API Token)",
    icon: <FiShield />,
    link: "/system/security",
  },
  {
    title: "Set Repayment Rules (EMI Date, Auto Debit)",
    icon: <FiCalendar />,
    link: "/system/repayment",
  },
];

const SystemConfig = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">System Configuration</h1>
        <p className="text-gray-500 text-sm">
          Configure loan policies, security rules & repayment settings.
        </p>
      </div>

      {/* GRID PANEL */}
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

export default SystemConfig;
