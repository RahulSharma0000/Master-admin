// src/pages/workflow/AssignSteps.jsx
import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiCheckCircle, FiUserCheck, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { roleService } from "../../services/roleService";

const STEP_KEY = "workflowSteps";          // Steps stored from WorkflowSteps.jsx
const ASSIGN_KEY = "workflowStepAssign";   // Mapping of step → role

const AssignSteps = () => {
  const navigate = useNavigate();

  // All roles from roleService
  const [roles, setRoles] = useState([]);

  // All workflow steps
  const [steps, setSteps] = useState([]);

  // stepId → roleId
  const [mapping, setMapping] = useState({});

  useEffect(() => {
    // Load roles (sync)
    const r = roleService.getRoles() || [];
    setRoles(Array.isArray(r) ? r : []);

    // Load workflow steps
    const savedSteps = JSON.parse(localStorage.getItem(STEP_KEY)) || [];
    setSteps(savedSteps);

    // Load mapping
    const savedMap = JSON.parse(localStorage.getItem(ASSIGN_KEY)) || {};
    setMapping(savedMap);
  }, []);

  // Change mapping for 1 step
  const updateMapping = (stepId, roleId) => {
    const updated = { ...mapping, [stepId]: Number(roleId) };
    setMapping(updated);
  };

  // Save mapping
  const saveAssignments = () => {
    localStorage.setItem(ASSIGN_KEY, JSON.stringify(mapping));
    alert("Workflow step assignments saved!");
    navigate("/workflow");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 border hover:bg-gray-100"
        >
          <FiArrowLeft className="text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex gap-2">
            <FiUserCheck /> Assign Steps to Roles
          </h1>
          <p className="text-gray-500 text-sm">
            Map each workflow step to the role responsible for it.
          </p>
        </div>
      </div>

      {/* MAIN PANEL */}
      <div className="bg-white p-6 rounded-2xl shadow-sm  max-w-4xl">
        {steps.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No workflow steps found. Please create steps first.
          </p>
        ) : (
          <div className="space-y-6">
            {steps.map((s) => (
              <div
                key={s.id}
                className="border p-4 rounded-xl bg-gray-50 flex items-center justify-between"
              >
                {/* Left → Step Info */}
                <div className="flex gap-2 items-center">
                  <FiList className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.description}</p>
                  </div>
                </div>

                {/* Right → Role selector */}
                <select
                  value={mapping[s.id] || ""}
                  onChange={(e) => updateMapping(s.id, Number(e.target.value))}
                  className="border p-2 rounded-xl bg-white"
                >
                  <option value="">Select role</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.roleName}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* SAVE BUTTON */}
            <button
              onClick={saveAssignments}
              className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6 flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <FiCheckCircle /> Save Step Assignments
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AssignSteps;
