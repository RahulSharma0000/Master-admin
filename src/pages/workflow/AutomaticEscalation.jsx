// src/pages/workflow/AutomaticEscalations.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiAlertTriangle,
  FiPlus,
  FiTrash2,
  FiSave,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const STEP_KEY = "workflowSteps";
const ESCALATION_KEY = "workflowEscalations";

// Default escalation rule structure
const defaultRule = {
  id: null,
  stepId: "",
  afterHours: 24,
  escalateToRole: "",
  escalateToEmail: "",
  message: "Your step is delayed. Please take necessary action.",
  autoReassign: false,
  retryAttempts: 1,
};

const AutomaticEscalations = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([]);
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState(defaultRule);

  // Load Steps + Escalation Rules
  useEffect(() => {
    const savedSteps = JSON.parse(localStorage.getItem(STEP_KEY)) || [];
    const savedEscalations = JSON.parse(localStorage.getItem(ESCALATION_KEY)) || [];

    setSteps(savedSteps);
    setRules(savedEscalations);
  }, []);

  // Add new escalation rule
  const addRule = () => {
    if (!newRule.stepId) return alert("Select workflow step!");
    if (!newRule.escalateToRole && !newRule.escalateToEmail)
      return alert("Assign either a role or an email!");

    const formatted = {
      ...newRule,
      id: Date.now(),
    };

    const updated = [...rules, formatted];
    setRules(updated);
    localStorage.setItem(ESCALATION_KEY, JSON.stringify(updated));

    // Reset form
    setNewRule(defaultRule);
    alert("Escalation rule added!");
  };

  // Delete rule
  const removeRule = (id) => {
    const updated = rules.filter((r) => r.id !== id);
    setRules(updated);
    localStorage.setItem(ESCALATION_KEY, JSON.stringify(updated));
  };

  const saveAll = () => {
    localStorage.setItem(ESCALATION_KEY, JSON.stringify(rules));
    alert("All escalation rules saved!");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 border rounded-xl"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiAlertTriangle /> Configure Automatic Escalations
          </h1>
          <p className="text-gray-500 text-sm">
            Automatically escalate delayed workflow steps to roles or emails.
          </p>
        </div>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* ADD NEW RULE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm  space-y-4">
          <h2 className="text-lg font-semibold">Add Escalation Rule</h2>

          {/* Select Step */}
          <div>
            <label className="text-sm text-gray-700">Select Step</label>
            <select
              value={newRule.stepId}
              onChange={(e) =>
                setNewRule({ ...newRule, stepId: e.target.value })
              }
              className="mt-1 p-3 border rounded-xl bg-gray-50 w-full"
            >
              <option value="">Choose workflow step</option>
              {steps.map((step) => (
                <option key={step.id} value={step.id}>
                  {step.name}
                </option>
              ))}
            </select>
          </div>

          {/* Time After Which to Escalate */}
          <div>
            <label className="text-sm text-gray-700">
              Escalate After (Hours)
            </label>
            <input
              type="number"
              value={newRule.afterHours}
              onChange={(e) =>
                setNewRule({ ...newRule, afterHours: Number(e.target.value) })
              }
              className="mt-1 p-3 border rounded-xl bg-gray-50 w-full"
              placeholder="e.g., 24"
            />
          </div>

          {/* Escalate To */}
          <div>
            <label className="text-sm text-gray-700 flex items-center gap-1">
              Escalate To Role (Optional)
            </label>
            <input
              value={newRule.escalateToRole}
              onChange={(e) =>
                setNewRule({ ...newRule, escalateToRole: e.target.value })
              }
              className="p-3 border rounded-xl bg-gray-50 w-full"
              placeholder="e.g., Senior Manager"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Escalate To Email</label>
            <input
              type="email"
              value={newRule.escalateToEmail}
              onChange={(e) =>
                setNewRule({ ...newRule, escalateToEmail: e.target.value })
              }
              className="p-3 border rounded-xl bg-gray-50 w-full"
              placeholder="example@company.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm text-gray-700">Escalation Message</label>
            <textarea
              rows={3}
              value={newRule.message}
              onChange={(e) =>
                setNewRule({ ...newRule, message: e.target.value })
              }
              className="p-3 border rounded-xl bg-gray-50 w-full"
            />
          </div>

          {/* Auto Reassign */}
          <label className="flex items-center gap-2 bg-gray-50 border p-3 rounded-xl">
            <input
              type="checkbox"
              checked={newRule.autoReassign}
              onChange={() =>
                setNewRule({
                  ...newRule,
                  autoReassign: !newRule.autoReassign,
                })
              }
            />
            Auto-Reassign Step to Escalated User
          </label>

          {/* Retry Attempts */}
          <div>
            <label className="text-sm text-gray-700">Retry Attempts</label>
            <input
              type="number"
              value={newRule.retryAttempts}
              onChange={(e) =>
                setNewRule({
                  ...newRule,
                  retryAttempts: Number(e.target.value),
                })
              }
              className="p-3 mt-1 border rounded-xl bg-gray-50 w-full"
              placeholder="1"
            />
          </div>

          <button
            onClick={addRule}
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700"
          >
            <FiPlus /> Add Escalation Rule
          </button>
        </div>

        {/* SAVED RULES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm ">
          <h2 className="text-lg font-semibold mb-4">Existing Escalation Rules</h2>

          {rules.length === 0 ? (
            <p className="text-gray-500">No escalation rules added yet.</p>
          ) : (
            <div className="space-y-4">
              {rules.map((r) => {
                const step = steps.find((s) => s.id == r.stepId);

                return (
                  <div
                    key={r.id}
                    className="border bg-gray-50 p-4 rounded-xl flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        Step: {step?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Escalate After: {r.afterHours} hours
                      </p>
                      {r.escalateToRole && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FiUser /> Role: {r.escalateToRole}
                        </p>
                      )}
                      {r.escalateToEmail && (
                        <p className="text-sm text-gray-600">
                          Email: {r.escalateToEmail}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Retry Attempts: {r.retryAttempts}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Auto-Reassign: {r.autoReassign ? "Yes" : "No"}
                      </p>
                    </div>

                    <button
                      onClick={() => removeRule(r.id)}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {rules.length > 0 && (
            <button
              onClick={saveAll}
              className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 mt-4"
            >
              <FiSave /> Save All Rules
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AutomaticEscalations;
