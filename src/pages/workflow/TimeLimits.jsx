// src/pages/workflow/TimeLimits.jsx

import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiClock, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const STEP_KEY = "workflowSteps";          // From Define Steps
const LIMIT_KEY = "workflowTimeLimits";    // LocalStorage → API later

const TimeLimits = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([]);
  const [timeLimits, setTimeLimits] = useState({});

  useEffect(() => {
    // Load workflow steps
    const savedSteps = JSON.parse(localStorage.getItem(STEP_KEY)) || [];
    setSteps(savedSteps);

    // Load saved time-limit rules
    const savedLimits = JSON.parse(localStorage.getItem(LIMIT_KEY)) || {};
    setTimeLimits(savedLimits);
  }, []);

  // Update single step time limit
  const updateLimit = (stepId, field, value) => {
    setTimeLimits((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value,
      },
    }));
  };

  const saveLimits = () => {
    localStorage.setItem(LIMIT_KEY, JSON.stringify(timeLimits));
    alert("Time limits saved successfully!");
    navigate("/workflow");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 border bg-gray-50 rounded-xl hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiClock /> Set Workflow Time Limits
          </h1>
          <p className="text-gray-500 text-sm">
            Define deadlines, reminders, and hard-stop rules for each step.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bg-white p-6 rounded-2xl shadow-sm  max-w-4xl space-y-6">
        {steps.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No workflow steps found. Please create steps first.
          </p>
        ) : (
          steps.map((step) => {
            const settings = timeLimits[step.id] || {};

            return (
              <div
                key={step.id}
                className="border rounded-xl bg-gray-50 p-5 space-y-4"
              >
                {/* STEP HEADER */}
                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {step.name}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>

                {/* SLA TIME */}
                <div>
                  <label className="text-sm font-medium">Step Duration (Hours)</label>
                  <input
                    type="number"
                    className="mt-1 p-3 border rounded-xl w-full bg-white"
                    placeholder="Example: 24"
                    value={settings.duration || ""}
                    onChange={(e) =>
                      updateLimit(step.id, "duration", Number(e.target.value))
                    }
                  />
                </div>

                {/* REMINDER TIME */}
                <div>
                  <label className="text-sm font-medium">
                    Send Reminder Before (Hours)
                  </label>
                  <input
                    type="number"
                    className="mt-1 p-3 border rounded-xl w-full bg-white"
                    placeholder="Example: 4"
                    value={settings.reminderBefore || ""}
                    onChange={(e) =>
                      updateLimit(step.id, "reminderBefore", Number(e.target.value))
                    }
                  />
                </div>

                {/* HARD STOP RULE */}
                <div className="flex items-center gap-3 bg-white border p-3 rounded-xl">
                  <input
                    type="checkbox"
                    checked={settings.hardStop || false}
                    onChange={() =>
                      updateLimit(step.id, "hardStop", !settings.hardStop)
                    }
                  />
                  <span className="text-sm text-gray-700">
                    Mark Step as “HARD STOP” (Cannot proceed before completion)
                  </span>
                </div>
              </div>
            );
          })
        )}

        {/* SAVE BUTTON */}
        {steps.length > 0 && (
          <button
            onClick={saveLimits}
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700 mt-4"
          >
            <FiSave /> Save Time Limits
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default TimeLimits;
