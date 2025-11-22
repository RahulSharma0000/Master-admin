import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiSave,
  FiAlertCircle,
  FiPieChart,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const KEY = "creditScoringRules";

// Default scoring factors
const defaultFactors = [
  { id: 1, name: "CIBIL Score", weight: 30, desc: "Credit history of applicant" },
  { id: 2, name: "Income Stability", weight: 25, desc: "Salary consistency / business stability" },
  { id: 3, name: "Previous Loan History", weight: 20, desc: "Late EMI, defaults, closures" },
  { id: 4, name: "Collateral Strength", weight: 25, desc: "Value & quality of pledged security" },
];

const CreditScoring = () => {
  const navigate = useNavigate();

  const [factors, setFactors] = useState(defaultFactors);
  const [newFactor, setNewFactor] = useState("");
  const [desc, setDesc] = useState("");
  const [minScore, setMinScore] = useState(70);

  // Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) {
      setFactors(saved.factors || defaultFactors);
      setMinScore(saved.minScore || 70);
    }
  }, []);

  // Calculate total weight
  const totalWeight = useMemo(
    () => factors.reduce((sum, f) => sum + Number(f.weight), 0),
    [factors]
  );

  // Add new custom factor
  const addFactor = () => {
    if (!newFactor.trim()) return alert("Enter factor name!");
    const updated = [
      ...factors,
      {
        id: Date.now(),
        name: newFactor,
        weight: 10,
        desc: desc || "Custom scoring parameter",
      },
    ];
    setFactors(updated);
    setNewFactor("");
    setDesc("");
  };

  const updateWeight = (id, weight) => {
    setFactors((prev) =>
      prev.map((f) => (f.id === id ? { ...f, weight: Number(weight) } : f))
    );
  };

  const removeFactor = (id) => {
    setFactors((prev) => prev.filter((f) => f.id !== id));
  };

  // Save to LocalStorage (Option 2)
  const saveRules = () => {
    if (totalWeight !== 100)
      return alert("Total weight must be EXACTLY 100%. Adjust weights.");

    localStorage.setItem(KEY, JSON.stringify({ factors, minScore }));

    alert("Credit scoring rules saved successfully!");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 border rounded-xl hover:bg-gray-100 transition"
        >
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Credit Scoring Rules</h1>
          <p className="text-gray-600 text-sm">
            Set scoring factors, weights and minimum eligible score.
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white p-6 rounded-xl shadow-sm border max-w-4xl space-y-6">

        {/* Add Factor Section */}
        <div className="p-4 border rounded-xl bg-gray-50">
          <p className="font-semibold text-gray-700 mb-2">Add Custom Factor</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <input
              type="text"
              value={newFactor}
              onChange={(e) => setNewFactor(e.target.value)}
              placeholder="Factor Name (e.g., Employment History)"
              className="p-3 border rounded-xl"
            />

            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Short description"
              className="p-3 border rounded-xl"
            />
          </div>

          <button
            onClick={addFactor}
            className="mt-3 px-4 bg-blue-600 text-white rounded-xl py-2 flex items-center gap-2"
          >
            <FiPlus /> Add Factor
          </button>
        </div>

        {/* Weight Progress Summary */}
        <div className="border rounded-xl p-4 bg-white">
          <p className="text-sm font-medium flex items-center gap-2 mb-2">
            <FiPieChart className="text-blue-600" />
            Total Weight Distribution
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                totalWeight === 100 ? "bg-green-600" : "bg-red-500"
              }`}
              style={{ width: `${Math.min(totalWeight, 100)}%` }}
            ></div>
          </div>

          <p
            className={`text-sm mt-2 font-semibold ${
              totalWeight === 100 ? "text-green-600" : "text-red-600"
            }`}
          >
            Total: {totalWeight}% (must be 100)
          </p>
        </div>

        {/* Factors List */}
        <div className="space-y-4">
          {factors.map((f) => (
            <div
              key={f.id}
              className="p-4 bg-gray-50 rounded-xl border flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{f.name}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={f.weight}
                  onChange={(e) => updateWeight(f.id, e.target.value)}
                  className="w-20 p-2 border rounded-xl"
                />
                <span>%</span>

                <button
                  onClick={() => removeFactor(f.id)}
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Minimum Score */}
        <div className="mt-4">
          <label className="text-sm font-medium">Minimum Score Required</label>
          <input
            type="number"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full p-3 border rounded-xl mt-2"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={saveRules}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <FiSave /> Save Scoring Rules
        </button>
      </div>
    </MainLayout>
  );
};

export default CreditScoring;
