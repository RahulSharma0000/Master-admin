import React from "react";
import MainLayout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import {
  FiList,
  FiUserCheck,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

// ★ Sidebar-style FeatureCard (LOS THEME)
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

    <h3 className="text-gray-800 text-[15px] font-medium">{title}</h3>
  </div>
);

// Clean icon list
const items = [
  {
    title: "Define Loan Workflow Steps",
    icon: <FiList />,
    link: "/workflow/steps",
  },
  {
    title: "Assign Steps to Roles",
    icon: <FiUserCheck />,
    link: "/workflow/assign",
  },
  {
    title: "Set Time Limits",
    icon: <FiClock />,
    link: "/workflow/time-limits",
  },
  {
    title: "Configure Automatic Escalations",
    icon: <FiAlertCircle />,
    link: "/workflow/escalations",
  },
];

const WorkflowMain = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Workflow Management</h1>
        <p className="text-gray-500 text-sm">
          Control workflow steps, role mapping, timings & escalation rules.
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

export default WorkflowMain;
