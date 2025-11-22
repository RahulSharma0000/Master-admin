import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

import {
  FiCreditCard,
  FiMail,
  FiServer,
  FiLink,
  FiKey,
  FiActivity,
  FiSettings,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";

// ★ LOS-Themed Integration Card
const IntegrationCard = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-4 items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition w-full text-left"
    >
      {/* Icon Box */}
      <div className="w-14 h-14 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center">
        {React.cloneElement(icon, {
          className: "text-gray-700 text-[22px]",
          strokeWidth: 1.5, // ✨ EXACT SIDEBAR STYLE
        })}
      </div>

      {/* Title + Subtitle */}
      <div>
        <h3 className="text-[15px] font-medium text-gray-800">{title}</h3>
        <p className="text-[13px] text-gray-500 mt-1">{description}</p>
      </div>
    </button>
  );
};

// Clean icons (no colors)
const modules = [
  {
    title: "Manage Payment Gateway",
    description: "Configure payment providers, credentials and webhooks.",
    icon: <FiCreditCard />,
    path: "/integration/payment-gateway",
  },
  {
    title: "Manage Credit Bureau",
    description: "Link and control credit bureau integrations.",
    icon: <FiServer />,
    path: "/integration/credit-bureau",
  },
  {
    title: "Manage SMS and Email API",
    description: "Add providers, templates and sender IDs.",
    icon: <FiMail />,
    path: "/integration/sms-email-api",
  },
  {
    title: "Manage Accounting / ERP System",
    description: "Connect ERP and sync financial data.",
    icon: <FiSettings />,
    path: "/integration/accounting-erp",
  },
  {
    title: "Manage CRM",
    description: "Connect external CRMs and map customer data.",
    icon: <FiUsers />,
    path: "/integration/crm",
  },
  {
    title: "Add API Key",
    description: "Generate and manage API keys for integrations.",
    icon: <FiKey />,
    path: "/integration/api-keys",
  },
  {
    title: "Set Endpoints",
    description: "Configure base URLs, callbacks and routes.",
    icon: <FiLink />,
    path: "/integration/endpoints",
  },
  {
    title: "Test Connections",
    description: "Run connectivity tests and validate integrations.",
    icon: <FiSmartphone />,
    path: "/integration/test-connections",
  },
  {
    title: "Monitor Status",
    description: "View logs, uptime, failures and system events.",
    icon: <FiActivity />,
    path: "/integration/monitor-status",
  },
];

const IntegrationManagement = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="p-6 ">
        
        {/* Page Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Integration Management
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  bg-white border border-gray-200 rounded-xl p-6">
          {modules.map((item) => (
            <IntegrationCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default IntegrationManagement;
