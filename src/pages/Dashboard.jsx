import React from "react";
import MainLayout from "../layout/MainLayout";

import ActiveUserChart from "../components/ActiveUserChart";
import LoanTrendChart from "../components/LoanTrendChart";
import ReactiveActivity from "../components/RecentActivity";
import AlertsPage from "../components/AlertsPage";

import useDashboard from "../hooks/useDashboard";
import { dashboardService } from "../services/dashboardService";

const Dashboard = () => {
  const { data: cards, loading: loadingCards } = useDashboard(
    dashboardService.getSummaryCards
  );

  const { data: loanTrendData } = useDashboard(
    dashboardService.getLoanTrends
  );

  const { data: usersPerBranch } = useDashboard(
    dashboardService.getUsersPerBranch
  );

  const { data: activities } = useDashboard(
    dashboardService.getActivities,
    []
  );

  const { data: alerts } = useDashboard(
    dashboardService.getAlerts,
    []
  );

  if (loadingCards) {
    return (
      <MainLayout>
        <div className="p-10 text-gray-600">Loading dashboard...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* TOP CARDS — SCREENSHOT STYLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <Card title="Total Organizations" value={cards.totalOrganizations} />
        <Card title="Total Branches" value={cards.totalBranches} />
        <Card title="Active Users" value={cards.activeUsers} />
        <Card title="Active & Pending Loans" value={cards.activeLoans} />
        <Card title="Daily Disbursement" value={cards.dailyDisbursement} />
        <Card title="API Status" value={cards.apiStatus} />
        <Card title="Recent Activities" value="View Logs →" />
        <Card title="Alerts" value={`${cards.alerts} Critical`} />

      </div>

      {/* CHARTS */}
      <div className="flex flex-col gap-8 mb-10">
        <ActiveUserChart usersPerBranch={usersPerBranch} />
        <LoanTrendChart data={loanTrendData} />
      </div>

      {/* ACTIVITY + ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <ReactiveActivity activities={activities} />
        <AlertsPage alerts={alerts} />
      </div>

    </MainLayout>
  );
};



// -----------------------
//   CARD COMPONENT
// -----------------------
const Card = ({ title, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">

    <div className="flex flex-col">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>

      <p className="text-3xl font-semibold text-gray-900 mt-3">
        {value}
      </p>
    </div>

  </div>
);

export default Dashboard;
