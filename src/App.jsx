import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/organization/Organization";
import AddOrganization from "./pages/organization/AddOrganization";
import CreateBranch from "./pages/organization/CreateBranch";
import Departments from "./pages/organization/Departments";
import AssignStaff from "./pages/organization/AssignStaff";
import ModuleAccess from "./pages/organization/ModuleAccess";
// import ProtectedRoute from "./components/ProtectedRoute"; // we will create this
import Users from "./pages/users/Users";
import AddUser from "./pages/users/AddUser";
import ResetPassword from "./pages/users/ResetPassword";
import ActivateDeactivate from "./pages/users/ActivateDeactivate";
import AssignUser from "./pages/users/AssignUser";
import UserActivity from "./pages/users/UserActivity";
import LoginAttempts from "./pages/users/LoginAttempts";
import UserList from "./pages/users/UserList";
// ROLE MANAGEMENT PAGES
import Roles from "./pages/roles/Roles";
import CreateRole from "./pages/roles/CreateRole";
import SetPermissions from "./pages/roles/SetPermissions";
import AssignPermissions from "./pages/roles/AssignPermissions";

import MasterData from "./pages/masterData/MasterData";
import LoanProducts from "./pages/masterData/LoanProducts";
import InterestSettings from "./pages/masterData/InterestSettings";
import DocumentTemplates from "./pages/masterData/DocumentTemplates";
import CreditScoring from "./pages/masterData/CreditScoring";

import SystemConfig from "./pages/systemConfig/SystemConfig";
import LoanPolicies from "./pages/systemConfig/LoanPolicies";
import SecuritySettings from "./pages/systemConfig/SecuritySettings";
import RepaymentRules from "./pages/systemConfig/RepaymentRules";
import WorkflowMain from "./pages/workflow/WorkflowMain";
import AssignSteps from "./pages/workflow/AssignSteps"
import TimeLimits from "./pages/workflow/TimeLimits"
import AutomaticEscalation from "./pages/workflow/AutomaticEscalation"
import DefineWorkflowSteps from "./pages/workflow/DefineWorkflowSteps";
import Notifications from "./pages/notifications/Notifications";
import SmsTemplates from "./pages/notifications/SmsTemplates";
import EmailTemplates from "./pages/notifications/EmailTemplates";
import SetPushNotificationRules from "./pages/notifications/SetPushNotificationRules";
import EmiReminders from "./pages/notifications/EmiReminders";
import SetOverdueAlerts from "./pages/notifications/SetOverdueAlerts";
import IntegrationManagement from "./pages/integration/IntegrationManagement";
import ManagePaymentGateway from "./pages/integration/ManagePaymentGateway";
import ManageCreditBureau from "./pages/integration/ManageCreditBureau";
import ManageSmsEmailApi from "./pages/integration/ManageSmsEmailApi";
import ManageAccountingErp from "./pages/integration/ManageAccountingErp"
import SetEndpoints from "./pages/integration/SetEndPoints";
import ManageCrm from "./pages/integration/ManageCrm";
import AddApiKeys from "./pages/integration/AddApiKeys";
import TestConnections from "./pages/integration/TestConnections";
import MonitorStatus from "./pages/integration/MonitorStatus";

import ReportingAnalytics from "./pages/Reports/ReportingAnalytics.jsx";
import DailyDisbursementReport from "./pages/Reports/DailyDisbursementReport.jsx";
import BranchPerformanceReport from "./pages/Reports/BranchPerformanceReport.jsx";
import LoanApprovalRejectionReport from "./pages/Reports/LoanApprovalRejectionReport.jsx";
import NpaReport from "./pages/Reports/NpaReport.jsx";  // FIXED
import RevenueReport from "./pages/Reports/RevenueReport.jsx";
import UserActivityReport from "./pages/Reports/UserActivityReport.jsx";


import AuditMain from "./pages/audit/AuditMain.jsx";
import ViewUserActions from "./pages/audit/ViewUserActions";
import TrackEditsDeletes from "./pages/audit/TrackEditsDeletes;.jsx";
import ActivityTimeline from "./pages/audit/ActivityTimeline;.jsx";
import TrackIpLogs from "./pages/audit/TrackIpLogs";
import BranchDataMonitor from "./pages/audit/BranchDataMonitor";

import ProfilePage from "./components/ProfilePage";


function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* DEFAULT ROUTE → Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/profile" element={<ProfilePage/>} />


       
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizations" element={<Organization /> } />
        <Route path="/organization/add" element={<AddOrganization />} />
        <Route path="/organization/branches/create" element={<CreateBranch />} />
        <Route path="/organization/departments" element={<Departments />} />
        <Route path="/organization/staff-assign" element={<AssignStaff />} />
        <Route path="/organization/module-access" element={<ModuleAccess />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/reset-password" element={<ResetPassword />} />
        <Route path="/users/toggle-status" element={<ActivateDeactivate />} />
        <Route path="/users/assign" element={<AssignUser />} />
        <Route path="/users/login-attempts" element={<LoginAttempts />} />
        <Route path="/users/activity" element={<UserActivity />} />
        <Route path="/users/list" element={<UserList />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/create" element={<CreateRole />} />
        <Route path="/roles/set-permissions" element={<SetPermissions />} />
        <Route path="/roles/assign-permissions" element={<AssignPermissions />} />


        <Route path="master" element={<MasterData />} />
        <Route path="master/loan-products" element={<LoanProducts />} />
        <Route path="master/interest-settings" element={<InterestSettings />} />
        <Route path="master/document-template" element={<DocumentTemplates />} />
        <Route path="master/credit-scoring" element={<CreditScoring />} />

        <Route path="system" element={<SystemConfig />} />
        <Route path="system/policies" element={<LoanPolicies />} />
        <Route path="system/security" element={<SecuritySettings />} />
        <Route path="system/repayment" element={<RepaymentRules />} />


        <Route path="/workflow" element={<WorkflowMain />} />
        <Route path="/workflow/assign" element={<AssignSteps />} />
        <Route path="/workflow/time-limits" element={<TimeLimits />} />
        <Route path="/workflow/escalations" element={<AutomaticEscalation />} />
        <Route path="/workflow/steps" element={<DefineWorkflowSteps />} />

        
        
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notifications/sms-templates" element={<SmsTemplates />} />
        <Route path="/notifications/email-templates" element={<EmailTemplates />} />
        <Route path="/notifications/push-rules" element={<SetPushNotificationRules />} />
        <Route path="/notifications/emi-reminders" element={<EmiReminders />} />
        <Route path="/notifications/overdue-alerts" element={<SetOverdueAlerts />} />

        <Route path="/integration" element={<IntegrationManagement />} />
        <Route path="/integration/payment-gateway" element={<ManagePaymentGateway/>} />
        <Route path="/integration/credit-bureau" element={<ManageCreditBureau/>} />
        <Route path="/integration/sms-email-api" element={<ManageSmsEmailApi/>} />
        <Route path="/integration/accounting-erp" element={<ManageAccountingErp/>} />
        <Route path="/integration/crm" element={<ManageCrm/>} />
        <Route path="/integration/endpoints" element={<SetEndpoints/>} />
        <Route path="/integration/api-keys" element={<AddApiKeys/>} />
        <Route path="/integration/test-connections" element={<TestConnections/>} />
        <Route path="/integration/monitor-status" element={<MonitorStatus/>} />

       
          <Route path="/reports" element={<ReportingAnalytics />} />
          <Route path="/reports/daily-disbursement" element={<DailyDisbursementReport/>} />
          <Route path="/reports/branch-performance" element={<BranchPerformanceReport/>} />
          <Route path="/reports/loan-approval-rejection" element={<LoanApprovalRejectionReport/>} />
          <Route path="/reports/npa-report" element={<NpaReport/>} />
          <Route path="/reports/revenue-report" element={<RevenueReport/>} />
          <Route path="/reports/user-activity-report" element={<UserActivityReport/>} />
      
          <Route path="/audit" element={<AuditMain />} />
          <Route path="/audit/user-actions" element={<ViewUserActions/>} />
          <Route path="/audit/edits-deletes" element={<TrackEditsDeletes/>} />
          <Route path="/audit/timestamps" element={<ActivityTimeline/>} />
          <Route path="/audit/ip-logs" element={<TrackIpLogs />} />
          <Route path="/audit/branch-data" element={<BranchDataMonitor />} />
          


      </Routes>
    </Router>
  );
}

export default App;