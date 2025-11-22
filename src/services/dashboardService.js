// Backend-ready Dashboard Service

import { api } from "./api";

// LocalStorage fallback helpers
const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const dashboardService = {
  
  // DASHBOARD CARDS
  async getSummaryCards() {
    const summary = {
      totalOrganizations: 12,
      totalBranches: 48,
      activeUsers: 230,
      activeLoans: 102,
      dailyDisbursement: "₹1,54,000",
      apiStatus: "All Good",
      alerts: 3,
    };

    return summary;

    // Later:
    // return api.get("/dashboard/summary/");
  },

  // LOAN TREND CHART
  async getLoanTrends() {
    const data = [
      { month: "Jan", loans: 50 },
      { month: "Feb", loans: 75 },
      { month: "Mar", loans: 60 },
      { month: "Apr", loans: 90 },
      { month: "May", loans: 120 },
      { month: "Jun", loans: 140 },
    ];
    return data;

    // Later:
    // return api.get("/dashboard/loan-trends/");
  },

  // USERS PER BRANCH CHART
  async getUsersPerBranch() {
    const data = [
      { branch: "Branch A", users: 45 },
      { branch: "Branch B", users: 70 },
      { branch: "Branch C", users: 55 },
      { branch: "Branch D", users: 90 },
    ];
    return data;

    // Later:
    // return api.get("/dashboard/users-per-branch/");
  },

  // RECENT ACTIVITIES
  async getActivities() {
    return getLocal("userActivity");

    // Later:
    // return api.get("/dashboard/recent-activities/");
  },

  // ALERTS
  async getAlerts() {
    return getLocal("alerts") || [
      { id: 1, type: "Critical", msg: "API latency increased", time: "5 min ago" },
      { id: 2, type: "Warning", msg: "Loan approval queue pending", time: "20 min ago" },
      { id: 3, type: "Info", msg: "System running normally", time: "1 hour ago" },
    ];

    // Later:
    // return api.get("/dashboard/alerts/");
  },
};
