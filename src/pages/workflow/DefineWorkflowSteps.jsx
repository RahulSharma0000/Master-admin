// src/pages/workflow/DefineWorkflowSteps.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiClock,
  FiList,
  FiMove,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const KEY = "workflowSteps";

const emptyStep = {
  id: null,
  name: "",
  type: "manual", // manual | system
  duration: 24,
  order: 1,
  description: "",
};

const DefineWorkflowSteps = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState(emptyStep);

  // Load steps
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY)) || [];
    setSteps(saved);
  }, []);

  // Save steps globally
  const saveStepsToStorage = (updated) => {
    localStorage.setItem(KEY, JSON.stringify(updated));
    setSteps(updated);
  };

  // Add new step
  const addStep = () => {
    if (!newStep.name.trim()) return alert("Enter step name!");

    const step = {
      ...newStep,
      id: Date.now(),
      order: steps.length + 1,
    };

    const updated = [...steps, step];
    saveStepsToStorage(updated);

    setNewStep(emptyStep);
    alert("Workflow step added!");
  };

  // Delete step
  const deleteStep = (id) => {
    let updated = steps.filter((s) => s.id !== id);

    // Reassign order numbers
    updated = updated.map((s, i) => ({ ...s, order: i + 1 }));

    saveStepsToStorage(updated);
  };

  // Move step up/down
  const moveStep = (index, direction) => {
    const updated = [...steps];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= updated.length) return;

    // swap
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    // Fix order numbers
    updated.forEach((s, i) => (s.order = i + 1));

    saveStepsToStorage(updated);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 rounded-xl border"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Define Loan Workflow Steps
          </h1>
          <p className="text-sm text-gray-500">
            Create the workflow sequence for loan processing (e.g., Underwriting → Verification → Approval).
          </p>
        </div>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* ADD NEW STEP */}
        <div className="bg-white p-6 rounded-2xl shadow-sm  space-y-5">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FiSettings /> Add Workflow Step
          </h2>

          <input
            type="text"
            placeholder="Step Name (e.g., Document Verification)"
            value={newStep.name}
            onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
            className="p-3 border rounded-xl bg-gray-50 w-full"
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Step Description (Optional)</label>
            <textarea
              rows={3}
              placeholder="Explain what happens in this step"
              value={newStep.description}
              onChange={(e) =>
                setNewStep({ ...newStep, description: e.target.value })
              }
              className="p-3 border rounded-xl bg-gray-50 w-full"
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Step Type</label>
            <select
              value={newStep.type}
              onChange={(e) => setNewStep({ ...newStep, type: e.target.value })}
              className="p-3 border rounded-xl bg-gray-50 w-full"
            >
              <option value="manual">Manual Review</option>
              <option value="system">Auto System Step</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FiClock /> Expected Duration (Hours)
            </label>
            <input
              type="number"
              value={newStep.duration}
              onChange={(e) =>
                setNewStep({ ...newStep, duration: Number(e.target.value) })
              }
              className="p-3 border rounded-xl mt-1 bg-gray-50 w-full"
            />
          </div>

          <button
            onClick={addStep}
            className="w-full py-3 rounded-xl bg-blue-600 text-white flex justify-center items-center gap-2 hover:bg-blue-700"
          >
            <FiPlus /> Add Step
          </button>
        </div>

        {/* EXISTING STEPS LIST */}
        <div className="bg-white p-6 rounded-2xl shadow-sm ">
          <h2 className="text-lg font-semibold mb-4">Workflow Steps</h2>

          {steps.length === 0 ? (
            <p className="text-gray-500 text-sm">No steps added yet.</p>
          ) : (
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="bg-gray-50 p-4 border rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {step.order}. {step.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {step.type === "manual" ? "Manual Step" : "System Step"} |{" "}
                      Duration: {step.duration} hrs
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {/* Move Up */}
                    <button
                      onClick={() => moveStep(index, -1)}
                      className="p-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                    >
                      ↑
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => moveStep(index, +1)}
                      className="p-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                    >
                      ↓
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteStep(step.id)}
                      className="p-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DefineWorkflowSteps;
